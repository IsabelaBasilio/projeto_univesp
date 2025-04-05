package br.com.drs.mater.service;

import br.com.drs.mater.model.Criancas;
import br.com.drs.mater.repository.CriancasRepository;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

@Service
public class ExcelService {

    @Value("${excel.file.path.crianca}")
    private String filePath;

    @Autowired
    private CriancasRepository criancasRepository;

    public List<Criancas> importarESalvarExcel() {
        List<Criancas> criancasList = new ArrayList<>();
        FileInputStream file = null;

        try {
            // Verificando se o arquivo realmente existe
            File excelFile = new File(filePath + "/arquivo.xlsx");
            if (!excelFile.exists()) {
                throw new IOException("Arquivo não encontrado: " + excelFile.getAbsolutePath());
            }

            // Abrindo o arquivo Excel
            file = new FileInputStream(excelFile);
            Workbook workbook = new XSSFWorkbook(file);
            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rowIterator = sheet.iterator();

            // Pular a primeira linha (cabeçalho)
            if (rowIterator.hasNext()) {
                rowIterator.next();
            }

            // Iterar pelas linhas do Excel e mapear os dados para o modelo Criancas
            while (rowIterator.hasNext()) {
                Row row = rowIterator.next();
                Criancas criancas = new Criancas();

                // Coluna Atendimento (String)
                criancas.setAtendido(getCellValueAsString(row.getCell(0)));

                // Coluna Nascimento (verificar se é data numérica e formatar corretamente)
                String nascimentoString = getCellValueAsDate(row.getCell(1));
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
                if (!nascimentoString.isEmpty()) {
                    criancas.setNascimento(LocalDate.parse(nascimentoString, formatter));
                }

                // Coluna Logradouro (String)
                criancas.setLogradouro(getCellValueAsString(row.getCell(2)));

                // Coluna Numero (verificar se é número)
                String numeroString = getCellValueAsString(row.getCell(3));
                criancas.setNumero(convertStringToInteger(numeroString));

                // Coluna Bairro (String)
                criancas.setBairro(getCellValueAsString(row.getCell(4)));

                criancasList.add(criancas);
            }

            // Salvar no banco de dados
            criancasRepository.saveAll(criancasList);

            workbook.close();

        } catch (IOException e) {
            e.printStackTrace();  // Exibir erro no log
            throw new RuntimeException("Erro ao ler ou processar o arquivo Excel: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Erro desconhecido: " + e.getMessage());
        } finally {
            try {
                if (file != null) {
                    file.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return criancasList;
    }

    // Método genérico para extrair valor de células como String
    private String getCellValueAsString(Cell cell) {
        if (cell == null) {
            return "";
        }
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                return String.valueOf((int) cell.getNumericCellValue());
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            case FORMULA:
                return cell.getCellFormula();
            case BLANK:
                return "";
            default:
                return "";
        }
    }

    // Método para verificar e formatar data
    private String getCellValueAsDate(Cell cell) {
        if (cell == null) {
            return "";
        }

        // Se for numérico, tentamos converter para data
        if (cell.getCellType() == CellType.NUMERIC && DateUtil.isCellDateFormatted(cell)) {
            // Caso seja uma célula de data, converte para String
            SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
            Date date = cell.getDateCellValue();
            return sdf.format(date);
        }
        // Caso contrário, lemos como String
        return getCellValueAsString(cell);
    }

    // Conversão de String para Integer (para a coluna numero)
    private Integer convertStringToInteger(String numberStr) {
        try {
            if (numberStr != null && !numberStr.trim().isEmpty()) {
                return Integer.parseInt(numberStr.trim());
            }
        } catch (NumberFormatException e) {
            System.err.println("Erro ao converter número: " + e.getMessage());
        }
        return null;  // Retornar null se não for possível converter
    }
}
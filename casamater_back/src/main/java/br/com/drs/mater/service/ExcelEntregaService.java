package br.com.drs.mater.service;

import br.com.drs.mater.model.Entrega;
import br.com.drs.mater.repository.EntregaRepository;
import jakarta.transaction.Transactional;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

@Service
@Transactional
public class ExcelEntregaService {

    @Value("${excel.file.path.entrega}")
    private String filePath;

    @Autowired
    private EntregaRepository entregaRepository;

    public List<Entrega> importarESalvarExcel() {
        List<Entrega> entregaList = new ArrayList<>();
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

            // Iterar pelas linhas do Excel e mapear os dados para o modelo Entrega
            while (rowIterator.hasNext()) {
                Row row = rowIterator.next();
                Entrega entrega = new Entrega();

                // Verifique se cada célula está sendo lida corretamente
                System.out.println("Lendo linha: " + row.getRowNum());

                // Coluna Responsavel (String)
                String responsavel = getCellValueAsString(row.getCell(0));
                entrega.setResponsavel(responsavel);
                System.out.println("Responsavel: " + responsavel);

                // Coluna Crianca (String)
                String crianca = getCellValueAsString(row.getCell(1));
                entrega.setCrianca(crianca);
                System.out.println("Criança: " + crianca);

                // Coluna Contato (String)
                String contato = getCellValueAsString(row.getCell(2));
                entrega.setContato(contato);
                System.out.println("Contato: " + contato);

                // Coluna Nascimento (verificar se é data numérica e formatar corretamente)
                Cell nascimentoCell = row.getCell(3);
                LocalDate nascimento = getCellValueAsLocalDate(nascimentoCell, "dd/MM/yyyy");
                if (nascimento != null) {
                    entrega.setNascimento(nascimento);
                    System.out.println("Data de nascimento formatada: " + nascimento);
                } else {
                    System.out.println("Célula nascimento está vazia ou não é uma data válida.");
                }

                // Coluna Tipo (String)
                String tipo = getCellValueAsString(row.getCell(4));
                entrega.setTipo(tipo);
                System.out.println("Tipo: " + tipo);

                // Adicionando a entrega à lista
                entregaList.add(entrega);
            }

            // Salvar no banco de dados
            entregaRepository.saveAll(entregaList);

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

        return entregaList;
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
                return new DecimalFormat("#").format(cell.getNumericCellValue());
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
    private LocalDate getCellValueAsLocalDate(Cell cell, String pattern) {
        if (cell == null) {
            return null;
        }
        if (cell.getCellType() == CellType.NUMERIC && DateUtil.isCellDateFormatted(cell)) {
            // Caso seja uma célula de data, converte para LocalDate
            Date date = cell.getDateCellValue();
            return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        } else if (cell.getCellType() == CellType.STRING) {
            String dateStr = cell.getStringCellValue();
            // Verificar se a String pode ser uma data válida
            try {
                return LocalDate.parse(dateStr, DateTimeFormatter.ofPattern(pattern));
            } catch (DateTimeParseException e) {
                System.err.println("Erro ao parsear data da célula como String: " + dateStr + " - " + e.getMessage());
            }
        }
        return null;
    }
}
package br.com.drs.mater.service;

import br.com.drs.mater.model.Medidas;
import br.com.drs.mater.repository.MedidasRepository;
import jakarta.transaction.Transactional;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
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
public class ExcelMedidasService {

    @Value("${excel.file.path.medidas}")
    private String filePath;

    @Autowired
    private MedidasRepository medidasRepository;

    public List<Medidas> importarESalvarExcel() {
        List<Medidas> medidasList = new ArrayList<>();
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

            // Iterar pelas linhas do Excel e mapear os dados para o modelo Medidas
            while (rowIterator.hasNext()) {
                Row row = rowIterator.next();
                Medidas medidas = new Medidas();

                // Verifique se cada célula está sendo lida corretamente
                System.out.println("Lendo linha: " + row.getRowNum());

                // Coluna Responsavel (String)
                String responsavel = getCellValueAsString(row.getCell(0));
                medidas.setResponsavel(responsavel);
                System.out.println("Responsavel: " + responsavel);

                // Coluna Crianca (String)
                String crianca = getCellValueAsString(row.getCell(1));
                medidas.setCrianca(crianca);
                System.out.println("Crianca: " + crianca);

                // Coluna NisMae (String)
                String nisMae = getCellValueAsString(row.getCell(2));
                medidas.setNisMae(nisMae);
                System.out.println("NIS: " + nisMae);

                // Coluna Entrada (verificar se é data numérica e formatar corretamente)
                Cell entradaCell = row.getCell(3);
                LocalDate entrada = getCellValueAsLocalDate(entradaCell, "dd/MM/yyyy");
                if (entrada != null) {
                    medidas.setEntrada(entrada);
                    System.out.println("Data de entrada formatada: " + entrada);
                } else {
                    System.out.println("Célula entrada está vazia ou não é uma data válida.");
                }

                // Coluna Nascimento (verificar se é data numérica e formatar corretamente)
                Cell nascimentoCell = row.getCell(4);
                LocalDate nascimento = getCellValueAsLocalDate(nascimentoCell, "dd/MM/yyyy");
                if (nascimento != null) {
                    medidas.setNascimento(nascimento);
                    System.out.println("Data de nascimento formatada: " + nascimento);
                } else {
                    System.out.println("Célula nascimento está vazia ou não é uma data válida.");
                }

                medidas.setMesAno(getCellValueAsString(row.getCell(5)));
                System.out.println("Mês e Ano: " + medidas.getMesAno());

                medidas.setPeso(getCellValueAsFloat(row.getCell(6)));
                System.out.println("Peso: " + medidas.getPeso());

                medidas.setEstatura(getCellValueAsFloat(row.getCell(7)));
                System.out.println("Estatura: " + medidas.getEstatura());

                medidas.setObservacao(getCellValueAsString(row.getCell(8)));
                System.out.println("Observação: " + medidas.getObservacao());

                // Adicionando a presença à lista
                medidasList.add(medidas);
            }

            // Salvar no banco de dados
            medidasRepository.saveAll(medidasList);

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

        return medidasList;
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
                return String.valueOf(cell.getNumericCellValue());
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

    // Método para extrair valor de células como Float
    private Float getCellValueAsFloat(Cell cell) {
        if (cell == null) {
            return null;
        }
        try {
            return (float) cell.getNumericCellValue();
        } catch (IllegalStateException e) {
            try {
                return Float.parseFloat(getCellValueAsString(cell));
            } catch (NumberFormatException ex) {
                return null;
            }
        }
    }
}
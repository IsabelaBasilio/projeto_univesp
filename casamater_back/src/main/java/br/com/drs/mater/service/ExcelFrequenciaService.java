package br.com.drs.mater.service;

import br.com.drs.mater.model.ListaPresenca;
import br.com.drs.mater.repository.ListaPresencaRepository;
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
public class ExcelFrequenciaService {

    @Value("${excel.file.path.frequencia}")
    private String filePath;

    @Autowired
    private ListaPresencaRepository presencaRepository;

    public List<ListaPresenca> importarESalvarExcel() {
        List<ListaPresenca> presencaList = new ArrayList<>();
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

            // Iterar pelas linhas do Excel e mapear os dados para o modelo ListaPresenca
            while (rowIterator.hasNext()) {
                Row row = rowIterator.next();
                ListaPresenca presenca = new ListaPresenca();

                // Verifique se cada célula está sendo lida corretamente
                System.out.println("Lendo linha: " + row.getRowNum());

                // Coluna Mae (String)
                String mae = getCellValueAsString(row.getCell(0));
                presenca.setMae(mae);
                System.out.println("Mae: " + mae);

                // Coluna NisMae (String)
                String documento = getCellValueAsString(row.getCell(1));
                presenca.setDocumento(documento);
                System.out.println("Documento: " + documento);

                // Coluna Crianca (String)
                String crianca = getCellValueAsString(row.getCell(2));
                presenca.setCrianca(crianca);
                System.out.println("Crianca: " + crianca);

                // Coluna NisCrianca (String)
                String nis = getCellValueAsString(row.getCell(3));
                presenca.setNis(nis);
                System.out.println("NIS: " + nis);

                // Coluna Nascimento (verificar se é data numérica e formatar corretamente)
                Cell nascimentoCell = row.getCell(4);
                LocalDate nascimento = getCellValueAsLocalDate(nascimentoCell, "dd/MM/yyyy");
                if (nascimento != null) {
                    presenca.setNascimento(nascimento);
                    System.out.println("Data de nascimento formatada: " + nascimento);
                } else {
                    System.out.println("Célula nascimento está vazia ou não é uma data válida.");
                }

                // Coluna Entrada (verificar se é data numérica e formatar corretamente)
                Cell entradaCell = row.getCell(5);
                LocalDate entrada = getCellValueAsLocalDate(entradaCell, "dd/MM/yyyy");
                if (entrada != null) {
                    presenca.setEntrada(entrada);
                    System.out.println("Data de entrada formatada: " + entrada);
                } else {
                    System.out.println("Célula entrada está vazia ou não é uma data válida.");
                }

                presenca.setReuniao01(getCellValueAsString(row.getCell(6)));
                System.out.println("Reunião 01: " + presenca.getReuniao01());

                presenca.setReuniao02(getCellValueAsString(row.getCell(7)));
                System.out.println("Reunião 02: " + presenca.getReuniao02());

                presenca.setReuniao03(getCellValueAsString(row.getCell(8)));
                System.out.println("Reunião 03: " + presenca.getReuniao03());

                // Adicionando a presença à lista
                presencaList.add(presenca);
            }

            // Salvar no banco de dados
            presencaRepository.saveAll(presencaList);

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

        return presencaList;
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
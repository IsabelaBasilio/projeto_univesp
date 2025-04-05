package br.com.drs.mater.service;

import br.com.drs.mater.model.Especiais;
import br.com.drs.mater.repository.EspeciaisRepository;
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
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
@Transactional
public class ExcelEspeciaisService {

    @Value("${excel.file.path.especiais}")
    private String filePath;

    @Autowired
    private EspeciaisRepository especiaisRepository;

    public List<Especiais> importarESalvarExcel() {
        List<Especiais> especiaisList = new ArrayList<>();
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

            // Iterar pelas linhas do Excel e mapear os dados para o modelo Especiais
            while (rowIterator.hasNext()) {
                Row row = rowIterator.next();
                Especiais especiais = new Especiais();

                // Verifique se cada célula está sendo lida corretamente
                System.out.println("Lendo linha: " + row.getRowNum());

                // Coluna TipoLeite (String)
                String tipoLeite = getCellValueAsString(row.getCell(0));
                especiais.setTipoLeite(tipoLeite);
                System.out.println("TipoLeite: " + tipoLeite);

                // Coluna Gramas (String)
                String gramas = getCellValueAsString(row.getCell(1));
                especiais.setGramas(gramas);
                System.out.println("Gramas: " + gramas);

                // Coluna Inicial (int)
                int inicial = getCellValueAsInt(row.getCell(2));
                especiais.setInicial(inicial);
                System.out.println("Inicial: " + inicial);

                // Coluna Janeiro (int)
                int janeiro = getCellValueAsInt(row.getCell(3));
                especiais.setJaneiro(janeiro);
                System.out.println("Janeiro: " + janeiro);

                // Coluna Fevereiro (int)
                int fevereiro = getCellValueAsInt(row.getCell(4));
                especiais.setFevereiro(fevereiro);
                System.out.println("Fevereiro: " + fevereiro);

                // Coluna Marco (int)
                int marco = getCellValueAsInt(row.getCell(5));
                especiais.setMarco(marco);
                System.out.println("Marco: " + marco);

                // Coluna Abril (int)
                int abril = getCellValueAsInt(row.getCell(6));
                especiais.setAbril(abril);
                System.out.println("Abril: " + abril);

                // Coluna Maio (int)
                int maio = getCellValueAsInt(row.getCell(7));
                especiais.setMaio(maio);
                System.out.println("Maio: " + maio);

                // Coluna Junho (int)
                int junho = getCellValueAsInt(row.getCell(8));
                especiais.setJunho(junho);
                System.out.println("Junho: " + junho);

                // Coluna Julho (int)
                int julho = getCellValueAsInt(row.getCell(9));
                especiais.setJulho(julho);
                System.out.println("Julho: " + julho);

                // Coluna Agosto (int)
                int agosto = getCellValueAsInt(row.getCell(10));
                especiais.setAgosto(agosto);
                System.out.println("Agosto: " + agosto);

                // Coluna Setembro (int)
                int setembro = getCellValueAsInt(row.getCell(11));
                especiais.setSetembro(setembro);
                System.out.println("Setembro: " + setembro);

                // Coluna Outubro (int)
                int outubro = getCellValueAsInt(row.getCell(12));
                especiais.setOutubro(outubro);
                System.out.println("Outubro: " + outubro);

                // Coluna Novembro (int)
                int novembro = getCellValueAsInt(row.getCell(13));
                especiais.setNovembro(novembro);
                System.out.println("Novembro: " + novembro);

                // Coluna Dezembro (int)
                int dezembro = getCellValueAsInt(row.getCell(14));
                especiais.setDezembro(dezembro);
                System.out.println("Dezembro: " + dezembro);

                // Coluna Total (int)
                int total = getCellValueAsInt(row.getCell(15));
                especiais.setTotal(total);
                System.out.println("Total: " + total);

                // Coluna Ano (String)
                String ano = getCellValueAsString(row.getCell(16));
                especiais.setAno(ano);
                System.out.println("Ano: " + ano);

                // Adicionando a especial à lista
                especiaisList.add(especiais);
            }

            // Salvar no banco de dados
            especiaisRepository.saveAll(especiaisList);

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

        return especiaisList;
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

    // Método genérico para extrair valor de células como int
    private int getCellValueAsInt(Cell cell) {
        if (cell == null) {
            return 0;
        }
        if (cell.getCellType() == CellType.NUMERIC) {
            return (int) cell.getNumericCellValue();
        }
        try {
            return Integer.parseInt(getCellValueAsString(cell));
        } catch (NumberFormatException e) {
            return 0;
        }
    }
}
package net.sppan.base.utils;

import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.openxml4j.opc.PackageAccess;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Properties;

public class ExcelReader {
    // *************xlsx文件读取函数************************
    // 在jdbc.properties上加上 excelUrl：xlsx文件的目录
    // excel_name为文件名，arg为需要查询的列号(输入数字则返回对应列 , 输入字符串则固定返回这个字符串)
    // 返回
    @SuppressWarnings({ "resource", "unused" })
    public static void xlsx_reader()
            throws IOException {

        File xlsxFile = new File("D:/公司文档/人员数据详情/离职人员信息统计（2017-2020）(2).xlsx");

        ArrayList<ArrayList<String>> excel_output = new ArrayList<ArrayList<String>>();
        try {
            OPCPackage p;
            p = OPCPackage.open(xlsxFile.getPath(), PackageAccess.READ);
            XLSX2CSV xlsx2csv = new XLSX2CSV(p, 20); // 20代表最大列数
            xlsx2csv.process();
            excel_output = xlsx2csv.get_output();
            p.close();   //释放
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        System.out.println( " 读取完毕");


        ArrayList<ArrayList<String>> ans = new ArrayList<ArrayList<String>>();
        // 遍历xlsx中的sheet

        // 对于每个sheet，读取其中的每一行
        for (int rowNum = 0; rowNum < excel_output.size(); rowNum++) {
            ArrayList<String> cur_output = excel_output.get(rowNum);
            System.out.println(cur_output);
        }
    }

    public static void main(String[] args) {
        try {
            xlsx_reader();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


//	// 判断后缀为xlsx的excel文件的数据类
//	@SuppressWarnings("deprecation")
//	private static String getValue(XSSFCell xssfRow) {
//		if (xssfRow == null) {
//			return null;
//		}
//		if (xssfRow.getCellType() == xssfRow.CELL_TYPE_BOOLEAN) {
//			return String.valueOf(xssfRow.getBooleanCellValue());
//		} else if (xssfRow.getCellType() == xssfRow.CELL_TYPE_NUMERIC) {
//			double cur = xssfRow.getNumericCellValue();
//			long longVal = Math.round(cur);
//			Object inputValue = null;
//			if (Double.parseDouble(longVal + ".0") == cur)
//				inputValue = longVal;
//			else
//				inputValue = cur;
//			return String.valueOf(inputValue);
//		} else if (xssfRow.getCellType() == xssfRow.CELL_TYPE_BLANK
//				|| xssfRow.getCellType() == xssfRow.CELL_TYPE_ERROR) {
//			return "";
//		} else {
//			return String.valueOf(xssfRow.getStringCellValue());
//		}
//	}

}

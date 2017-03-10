package com.mtc.zljk.device.yingtong.common;
/**
 *
 * MTC-上海农汇信息科技有限公司
 * Copyright © 2015 农汇 版权所有
 */

/**
 * @ClassName: ByteIntUtil
 * @Date 2016-6-23
 * @author loyeWen
 *
 */
public class ByteNumUtil {
	/**
	 * 将int数值转换为占四个字节的byte数组，本方法适用于(高位在前，低位在后)的顺序。
	 */
	public static byte[] intToBytes(int value) {
		byte[] src = new byte[4];
		src[0] = (byte) ((value >> 24) & 0xFF);
		src[1] = (byte) ((value >> 16) & 0xFF);
		src[2] = (byte) ((value >> 8) & 0xFF);
		src[3] = (byte) (value & 0xFF);
		return src;
	}

	/**
	 * byte数组中取int数值，本方法适用于(高位在前，低位在后)的顺序。
	 */
	public static int bytesToInt(byte[] src) {
		int value;
		value = (int) (((src[0] & 0xFF) << 24)
				| ((src[1] & 0xFF) << 16)
				| ((src[2] & 0xFF) << 8) | (src[3] & 0xFF));
		return value;
	}

	/**
	 * 将int数值转换为占四个字节的byte数组，本方法适用于(低位在前，高位在后)的顺序。
	 * 
	 * @param value
	 *            要转换的int值
	 * @return
	 */
	public static byte[] intToBytes2(int value) {
		byte[] src = new byte[4];
		src[3] = (byte) ((value >> 24) & 0xFF);
		src[2] = (byte) ((value >> 16) & 0xFF);
		src[1] = (byte) ((value >> 8) & 0xFF);
		src[0] = (byte) (value & 0xFF);
		return src;
	}

	/**
	 * byte数组中取int数值，本方法适用于(低位在前，高位在后)的顺序。
	 * 
	 * @param src
	 *            byte数组
	 * @return int数值
	 */
	public static int bytesToInt2(byte[] src) {
		int value;
		value = (int) ((src[0] & 0xFF) | ((src[1] & 0xFF) << 8)
				| ((src[2] & 0xFF) << 16) | ((src[3] & 0xFF) << 24));
		return value;
	}
	
	/**
	 * byte数组转换成long，本方法适用于(高位在前，低位在后)的顺序。
	 * 
	 * @param b
	 *            byte数组
	 * @return long 数值
	 */
    public static long bytes2Long(byte[] b) { 
        long s = 0; 
        
        long s7 = b[0] & 0xff;// 最低位 
        long s6 = b[1] & 0xff; 
        long s5 = b[2] & 0xff; 
        long s4 = b[3] & 0xff; 
        long s3 = b[4] & 0xff;// 最低位 
        long s2 = b[5] & 0xff; 
        long s1 = b[6] & 0xff; 
        long s0 = b[7] & 0xff; 
 
        // s0不变 
        s1 <<= 8; 
        s2 <<= 16; 
        s3 <<= 24; 
        s4 <<= 8 * 4; 
        s5 <<= 8 * 5; 
        s6 <<= 8 * 6; 
        s7 <<= 8 * 7; 
        s = s0 | s1 | s2 | s3 | s4 | s5 | s6 | s7; 
        return s; 
    }

	/**
	 * byte数组转换short，本方法适用于(高位在前，低位在后)的顺序。
	 */
	public static short bytesToShort(byte[] src) {
		short value;
		value = (short) (((src[0] & 0xFF) << 8)
				| src[1] & 0xFF);
		return value;
	}

	public static byte[] short2Byte(short a){
		byte[] b = new byte[2];
		b[0] = (byte) (a >> 8);
		b[1] = (byte) (a);

		return b;
	}

	public static void main(String[] args) {
		byte[] temp = StringHexUtil.hexString2Bytes("FFE2");
		byte[] temp22 = {(byte)0,(byte)0,temp[0],temp[1]} ;

		System.out.println("result11:" + ByteNumUtil.bytesToShort(StringHexUtil.hexString2Bytes("FFE2")));

		System.out.println("result22:" + ByteNumUtil.bytesToInt(temp22));
	}
}

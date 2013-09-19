
var openpgp = require('../../../index');
var AESencrypt = openpgp.ciphers.symmetric.AES.encrypt;
var keyExpansion = openpgp.ciphers.symmetric.AES.keyExpansion;
var util = openpgp.util;

require('../../unittest').register("AES Rijndael cipher test with test vectors from ecb_tbl.txt", function(test_result) {
	var result = new Array();
	function test_aes(input, key, output) {
		return (util.hexstrdump(util.bin2str(AESencrypt(input,keyExpansion(util.bin2str(key))))) == util.hexstrdump(util.bin2str(output)));
	};
	var testvectors128 = [[[0x00,0x01,0x02,0x03,0x05,0x06,0x07,0x08,0x0A,0x0B,0x0C,0x0D,0x0F,0x10,0x11,0x12],[0x50,0x68,0x12,0xA4,0x5F,0x08,0xC8,0x89,0xB9,0x7F,0x59,0x80,0x03,0x8B,0x83,0x59],[0xD8,0xF5,0x32,0x53,0x82,0x89,0xEF,0x7D,0x06,0xB5,0x06,0xA4,0xFD,0x5B,0xE9,0xC9]],
	                      [[0x14,0x15,0x16,0x17,0x19,0x1A,0x1B,0x1C,0x1E,0x1F,0x20,0x21,0x23,0x24,0x25,0x26],[0x5C,0x6D,0x71,0xCA,0x30,0xDE,0x8B,0x8B,0x00,0x54,0x99,0x84,0xD2,0xEC,0x7D,0x4B],[0x59,0xAB,0x30,0xF4,0xD4,0xEE,0x6E,0x4F,0xF9,0x90,0x7E,0xF6,0x5B,0x1F,0xB6,0x8C]],
	                      [[0x28,0x29,0x2A,0x2B,0x2D,0x2E,0x2F,0x30,0x32,0x33,0x34,0x35,0x37,0x38,0x39,0x3A],[0x53,0xF3,0xF4,0xC6,0x4F,0x86,0x16,0xE4,0xE7,0xC5,0x61,0x99,0xF4,0x8F,0x21,0xF6],[0xBF,0x1E,0xD2,0xFC,0xB2,0xAF,0x3F,0xD4,0x14,0x43,0xB5,0x6D,0x85,0x02,0x5C,0xB1]],
	                      [[0x3C,0x3D,0x3E,0x3F,0x41,0x42,0x43,0x44,0x46,0x47,0x48,0x49,0x4B,0x4C,0x4D,0x4E],[0xA1,0xEB,0x65,0xA3,0x48,0x71,0x65,0xFB,0x0F,0x1C,0x27,0xFF,0x99,0x59,0xF7,0x03],[0x73,0x16,0x63,0x2D,0x5C,0x32,0x23,0x3E,0xDC,0xB0,0x78,0x05,0x60,0xEA,0xE8,0xB2]],
	                      [[0x50,0x51,0x52,0x53,0x55,0x56,0x57,0x58,0x5A,0x5B,0x5C,0x5D,0x5F,0x60,0x61,0x62],[0x35,0x53,0xEC,0xF0,0xB1,0x73,0x95,0x58,0xB0,0x8E,0x35,0x0A,0x98,0xA3,0x9B,0xFA],[0x40,0x8C,0x07,0x3E,0x3E,0x25,0x38,0x07,0x2B,0x72,0x62,0x5E,0x68,0xB8,0x36,0x4B]],
	                      [[0x64,0x65,0x66,0x67,0x69,0x6A,0x6B,0x6C,0x6E,0x6F,0x70,0x71,0x73,0x74,0x75,0x76],[0x67,0x42,0x99,0x69,0x49,0x0B,0x97,0x11,0xAE,0x2B,0x01,0xDC,0x49,0x7A,0xFD,0xE8],[0xE1,0xF9,0x4D,0xFA,0x77,0x65,0x97,0xBE,0xAC,0xA2,0x62,0xF2,0xF6,0x36,0x6F,0xEA]],
	                      [[0x78,0x79,0x7A,0x7B,0x7D,0x7E,0x7F,0x80,0x82,0x83,0x84,0x85,0x87,0x88,0x89,0x8A],[0x93,0x38,0x5C,0x1F,0x2A,0xEC,0x8B,0xED,0x19,0x2F,0x5A,0x8E,0x16,0x1D,0xD5,0x08],[0xF2,0x9E,0x98,0x6C,0x6A,0x1C,0x27,0xD7,0xB2,0x9F,0xFD,0x7E,0xE9,0x2B,0x75,0xF1]],
	                      [[0x8C,0x8D,0x8E,0x8F,0x91,0x92,0x93,0x94,0x96,0x97,0x98,0x99,0x9B,0x9C,0x9D,0x9E],[0xB5,0xBF,0x94,0x6B,0xE1,0x9B,0xEB,0x8D,0xB3,0x98,0x3B,0x5F,0x4C,0x6E,0x8D,0xDB],[0x13,0x1C,0x88,0x6A,0x57,0xF8,0xC2,0xE7,0x13,0xAB,0xA6,0x95,0x5E,0x2B,0x55,0xB5]],
	                      [[0xA0,0xA1,0xA2,0xA3,0xA5,0xA6,0xA7,0xA8,0xAA,0xAB,0xAC,0xAD,0xAF,0xB0,0xB1,0xB2],[0x41,0x32,0x1E,0xE1,0x0E,0x21,0xBD,0x90,0x72,0x27,0xC4,0x45,0x0F,0xF4,0x23,0x24],[0xD2,0xAB,0x76,0x62,0xDF,0x9B,0x8C,0x74,0x02,0x10,0xE5,0xEE,0xB6,0x1C,0x19,0x9D]],
	                      [[0xB4,0xB5,0xB6,0xB7,0xB9,0xBA,0xBB,0xBC,0xBE,0xBF,0xC0,0xC1,0xC3,0xC4,0xC5,0xC6],[0x00,0xA8,0x2F,0x59,0xC9,0x1C,0x84,0x86,0xD1,0x2C,0x0A,0x80,0x12,0x4F,0x60,0x89],[0x14,0xC1,0x05,0x54,0xB2,0x85,0x9C,0x48,0x4C,0xAB,0x58,0x69,0xBB,0xE7,0xC4,0x70]],
	                      [[0xC8,0xC9,0xCA,0xCB,0xCD,0xCE,0xCF,0xD0,0xD2,0xD3,0xD4,0xD5,0xD7,0xD8,0xD9,0xDA],[0x7C,0xE0,0xFD,0x07,0x67,0x54,0x69,0x1B,0x4B,0xBD,0x9F,0xAF,0x8A,0x13,0x72,0xFE],[0xDB,0x4D,0x49,0x8F,0x0A,0x49,0xCF,0x55,0x44,0x5D,0x50,0x2C,0x1F,0x9A,0xB3,0xB5]],
	                      [[0xDC,0xDD,0xDE,0xDF,0xE1,0xE2,0xE3,0xE4,0xE6,0xE7,0xE8,0xE9,0xEB,0xEC,0xED,0xEE],[0x23,0x60,0x5A,0x82,0x43,0xD0,0x77,0x64,0x54,0x1B,0xC5,0xAD,0x35,0x5B,0x31,0x29],[0x6D,0x96,0xFE,0xF7,0xD6,0x65,0x90,0xA7,0x7A,0x77,0xBB,0x20,0x56,0x66,0x7F,0x7F]],
	                      [[0xF0,0xF1,0xF2,0xF3,0xF5,0xF6,0xF7,0xF8,0xFA,0xFB,0xFC,0xFD,0xFE,0x01,0x00,0x02],[0x12,0xA8,0xCF,0xA2,0x3E,0xA7,0x64,0xFD,0x87,0x62,0x32,0xB4,0xE8,0x42,0xBC,0x44],[0x31,0x6F,0xB6,0x8E,0xDB,0xA7,0x36,0xC5,0x3E,0x78,0x47,0x7B,0xF9,0x13,0x72,0x5C]],
	                      [[0x04,0x05,0x06,0x07,0x09,0x0A,0x0B,0x0C,0x0E,0x0F,0x10,0x11,0x13,0x14,0x15,0x16],[0xBC,0xAF,0x32,0x41,0x5E,0x83,0x08,0xB3,0x72,0x3E,0x5F,0xDD,0x85,0x3C,0xCC,0x80],[0x69,0x36,0xF2,0xB9,0x3A,0xF8,0x39,0x7F,0xD3,0xA7,0x71,0xFC,0x01,0x1C,0x8C,0x37]],
	                      [[0x2C,0x2D,0x2E,0x2F,0x31,0x32,0x33,0x34,0x36,0x37,0x38,0x39,0x3B,0x3C,0x3D,0x3E],[0x89,0xAF,0xAE,0x68,0x5D,0x80,0x1A,0xD7,0x47,0xAC,0xE9,0x1F,0xC4,0x9A,0xDD,0xE0],[0xF3,0xF9,0x2F,0x7A,0x9C,0x59,0x17,0x9C,0x1F,0xCC,0x2C,0x2B,0xA0,0xB0,0x82,0xCD]]];
	
	var testvectors192 = [[[0x00,0x01,0x02,0x03,0x05,0x06,0x07,0x08,0x0A,0x0B,0x0C,0x0D,0x0F,0x10,0x11,0x12,0x14,0x15,0x16,0x17,0x19,0x1A,0x1B,0x1C],[0x2D,0x33,0xEE,0xF2,0xC0,0x43,0x0A,0x8A,0x9E,0xBF,0x45,0xE8,0x09,0xC4,0x0B,0xB6],[0xDF,0xF4,0x94,0x5E,0x03,0x36,0xDF,0x4C,0x1C,0x56,0xBC,0x70,0x0E,0xFF,0x83,0x7F]],
	                      [[0x1E,0x1F,0x20,0x21,0x23,0x24,0x25,0x26,0x28,0x29,0x2A,0x2B,0x2D,0x2E,0x2F,0x30,0x32,0x33,0x34,0x35,0x37,0x38,0x39,0x3A],[0x6A,0xA3,0x75,0xD1,0xFA,0x15,0x5A,0x61,0xFB,0x72,0x35,0x3E,0x0A,0x5A,0x87,0x56],[0xB6,0xFD,0xDE,0xF4,0x75,0x27,0x65,0xE3,0x47,0xD5,0xD2,0xDC,0x19,0x6D,0x12,0x52]],
	                      [[0x3C,0x3D,0x3E,0x3F,0x41,0x42,0x43,0x44,0x46,0x47,0x48,0x49,0x4B,0x4C,0x4D,0x4E,0x50,0x51,0x52,0x53,0x55,0x56,0x57,0x58],[0xBC,0x37,0x36,0x51,0x8B,0x94,0x90,0xDC,0xB8,0xED,0x60,0xEB,0x26,0x75,0x8E,0xD4],[0xD2,0x36,0x84,0xE3,0xD9,0x63,0xB3,0xAF,0xCF,0x1A,0x11,0x4A,0xCA,0x90,0xCB,0xD6]],
	                      [[0x5A,0x5B,0x5C,0x5D,0x5F,0x60,0x61,0x62,0x64,0x65,0x66,0x67,0x69,0x6A,0x6B,0x6C,0x6E,0x6F,0x70,0x71,0x73,0x74,0x75,0x76],[0xAA,0x21,0x44,0x02,0xB4,0x6C,0xFF,0xB9,0xF7,0x61,0xEC,0x11,0x26,0x3A,0x31,0x1E],[0x3A,0x7A,0xC0,0x27,0x75,0x3E,0x2A,0x18,0xC2,0xCE,0xAB,0x9E,0x17,0xC1,0x1F,0xD0]],
	                      [[0x78,0x79,0x7A,0x7B,0x7D,0x7E,0x7F,0x80,0x82,0x83,0x84,0x85,0x87,0x88,0x89,0x8A,0x8C,0x8D,0x8E,0x8F,0x91,0x92,0x93,0x94],[0x02,0xAE,0xA8,0x6E,0x57,0x2E,0xEA,0xB6,0x6B,0x2C,0x3A,0xF5,0xE9,0xA4,0x6F,0xD6],[0x8F,0x67,0x86,0xBD,0x00,0x75,0x28,0xBA,0x26,0x60,0x3C,0x16,0x01,0xCD,0xD0,0xD8]],
	                      [[0x96,0x97,0x98,0x99,0x9B,0x9C,0x9D,0x9E,0xA0,0xA1,0xA2,0xA3,0xA5,0xA6,0xA7,0xA8,0xAA,0xAB,0xAC,0xAD,0xAF,0xB0,0xB1,0xB2],[0xE2,0xAE,0xF6,0xAC,0xC3,0x3B,0x96,0x5C,0x4F,0xA1,0xF9,0x1C,0x75,0xFF,0x6F,0x36],[0xD1,0x7D,0x07,0x3B,0x01,0xE7,0x15,0x02,0xE2,0x8B,0x47,0xAB,0x55,0x11,0x68,0xB3]],
	                      [[0xB4,0xB5,0xB6,0xB7,0xB9,0xBA,0xBB,0xBC,0xBE,0xBF,0xC0,0xC1,0xC3,0xC4,0xC5,0xC6,0xC8,0xC9,0xCA,0xCB,0xCD,0xCE,0xCF,0xD0],[0x06,0x59,0xDF,0x46,0x42,0x71,0x62,0xB9,0x43,0x48,0x65,0xDD,0x94,0x99,0xF9,0x1D],[0xA4,0x69,0xDA,0x51,0x71,0x19,0xFA,0xB9,0x58,0x76,0xF4,0x1D,0x06,0xD4,0x0F,0xFA]],
	                      [[0xD2,0xD3,0xD4,0xD5,0xD7,0xD8,0xD9,0xDA,0xDC,0xDD,0xDE,0xDF,0xE1,0xE2,0xE3,0xE4,0xE6,0xE7,0xE8,0xE9,0xEB,0xEC,0xED,0xEE],[0x49,0xA4,0x42,0x39,0xC7,0x48,0xFE,0xB4,0x56,0xF5,0x9C,0x27,0x6A,0x56,0x58,0xDF],[0x60,0x91,0xAA,0x3B,0x69,0x5C,0x11,0xF5,0xC0,0xB6,0xAD,0x26,0xD3,0xD8,0x62,0xFF]],
	                      [[0xF0,0xF1,0xF2,0xF3,0xF5,0xF6,0xF7,0xF8,0xFA,0xFB,0xFC,0xFD,0xFE,0x01,0x00,0x02,0x04,0x05,0x06,0x07,0x09,0x0A,0x0B,0x0C],[0x66,0x20,0x8F,0x6E,0x9D,0x04,0x52,0x5B,0xDE,0xDB,0x27,0x33,0xB6,0xA6,0xBE,0x37],[0x70,0xF9,0xE6,0x7F,0x9F,0x8D,0xF1,0x29,0x41,0x31,0x66,0x2D,0xC6,0xE6,0x93,0x64]],
	                      [[0x0E,0x0F,0x10,0x11,0x13,0x14,0x15,0x16,0x18,0x19,0x1A,0x1B,0x1D,0x1E,0x1F,0x20,0x22,0x23,0x24,0x25,0x27,0x28,0x29,0x2A],[0x33,0x93,0xF8,0xDF,0xC7,0x29,0xC9,0x7F,0x54,0x80,0xB9,0x50,0xBC,0x96,0x66,0xB0],[0xD1,0x54,0xDC,0xAF,0xAD,0x8B,0x20,0x7F,0xA5,0xCB,0xC9,0x5E,0x99,0x96,0xB5,0x59]],
	                      [[0x2C,0x2D,0x2E,0x2F,0x31,0x32,0x33,0x34,0x36,0x37,0x38,0x39,0x3B,0x3C,0x3D,0x3E,0x40,0x41,0x42,0x43,0x45,0x46,0x47,0x48],[0x60,0x68,0x34,0xC8,0xCE,0x06,0x3F,0x32,0x34,0xCF,0x11,0x45,0x32,0x5D,0xBD,0x71],[0x49,0x34,0xD5,0x41,0xE8,0xB4,0x6F,0xA3,0x39,0xC8,0x05,0xA7,0xAE,0xB9,0xE5,0xDA]],
	                      [[0x4A,0x4B,0x4C,0x4D,0x4F,0x50,0x51,0x52,0x54,0x55,0x56,0x57,0x59,0x5A,0x5B,0x5C,0x5E,0x5F,0x60,0x61,0x63,0x64,0x65,0x66],[0xFE,0xC1,0xC0,0x4F,0x52,0x9B,0xBD,0x17,0xD8,0xCE,0xCF,0xCC,0x47,0x18,0xB1,0x7F],[0x62,0x56,0x4C,0x73,0x8F,0x3E,0xFE,0x18,0x6E,0x1A,0x12,0x7A,0x0C,0x4D,0x3C,0x61]],
	                      [[0x68,0x69,0x6A,0x6B,0x6D,0x6E,0x6F,0x70,0x72,0x73,0x74,0x75,0x77,0x78,0x79,0x7A,0x7C,0x7D,0x7E,0x7F,0x81,0x82,0x83,0x84],[0x32,0xDF,0x99,0xB4,0x31,0xED,0x5D,0xC5,0xAC,0xF8,0xCA,0xF6,0xDC,0x6C,0xE4,0x75],[0x07,0x80,0x5A,0xA0,0x43,0x98,0x6E,0xB2,0x36,0x93,0xE2,0x3B,0xEF,0x8F,0x34,0x38]],
	                      [[0x86,0x87,0x88,0x89,0x8B,0x8C,0x8D,0x8E,0x90,0x91,0x92,0x93,0x95,0x96,0x97,0x98,0x9A,0x9B,0x9C,0x9D,0x9F,0xA0,0xA1,0xA2],[0x7F,0xDC,0x2B,0x74,0x6F,0x3F,0x66,0x52,0x96,0x94,0x3B,0x83,0x71,0x0D,0x1F,0x82],[0xDF,0x0B,0x49,0x31,0x03,0x8B,0xAD,0xE8,0x48,0xDE,0xE3,0xB4,0xB8,0x5A,0xA4,0x4B]],
	                      [[0xA4,0xA5,0xA6,0xA7,0xA9,0xAA,0xAB,0xAC,0xAE,0xAF,0xB0,0xB1,0xB3,0xB4,0xB5,0xB6,0xB8,0xB9,0xBA,0xBB,0xBD,0xBE,0xBF,0xC0],[0x8F,0xBA,0x15,0x10,0xA3,0xC5,0xB8,0x7E,0x2E,0xAA,0x3F,0x7A,0x91,0x45,0x5C,0xA2],[0x59,0x2D,0x5F,0xDE,0xD7,0x65,0x82,0xE4,0x14,0x3C,0x65,0x09,0x93,0x09,0x47,0x7C]]];
	
	var testvectors256 = [[[0x00,0x01,0x02,0x03,0x05,0x06,0x07,0x08,0x0A,0x0B,0x0C,0x0D,0x0F,0x10,0x11,0x12,0x14,0x15,0x16,0x17,0x19,0x1A,0x1B,0x1C,0x1E,0x1F,0x20,0x21,0x23,0x24,0x25,0x26],[0x83,0x4E,0xAD,0xFC,0xCA,0xC7,0xE1,0xB3,0x06,0x64,0xB1,0xAB,0xA4,0x48,0x15,0xAB],[0x19,0x46,0xDA,0xBF,0x6A,0x03,0xA2,0xA2,0xC3,0xD0,0xB0,0x50,0x80,0xAE,0xD6,0xFC]],
						  [[0x28,0x29,0x2A,0x2B,0x2D,0x2E,0x2F,0x30,0x32,0x33,0x34,0x35,0x37,0x38,0x39,0x3A,0x3C,0x3D,0x3E,0x3F,0x41,0x42,0x43,0x44,0x46,0x47,0x48,0x49,0x4B,0x4C,0x4D,0x4E],[0xD9,0xDC,0x4D,0xBA,0x30,0x21,0xB0,0x5D,0x67,0xC0,0x51,0x8F,0x72,0xB6,0x2B,0xF1],[0x5E,0xD3,0x01,0xD7,0x47,0xD3,0xCC,0x71,0x54,0x45,0xEB,0xDE,0xC6,0x2F,0x2F,0xB4]],
						  [[0x50,0x51,0x52,0x53,0x55,0x56,0x57,0x58,0x5A,0x5B,0x5C,0x5D,0x5F,0x60,0x61,0x62,0x64,0x65,0x66,0x67,0x69,0x6A,0x6B,0x6C,0x6E,0x6F,0x70,0x71,0x73,0x74,0x75,0x76],[0xA2,0x91,0xD8,0x63,0x01,0xA4,0xA7,0x39,0xF7,0x39,0x21,0x73,0xAA,0x3C,0x60,0x4C],[0x65,0x85,0xC8,0xF4,0x3D,0x13,0xA6,0xBE,0xAB,0x64,0x19,0xFC,0x59,0x35,0xB9,0xD0]],
						  [[0x78,0x79,0x7A,0x7B,0x7D,0x7E,0x7F,0x80,0x82,0x83,0x84,0x85,0x87,0x88,0x89,0x8A,0x8C,0x8D,0x8E,0x8F,0x91,0x92,0x93,0x94,0x96,0x97,0x98,0x99,0x9B,0x9C,0x9D,0x9E],[0x42,0x64,0xB2,0x69,0x64,0x98,0xDE,0x4D,0xF7,0x97,0x88,0xA9,0xF8,0x3E,0x93,0x90],[0x2A,0x5B,0x56,0xA5,0x96,0x68,0x0F,0xCC,0x0E,0x05,0xF5,0xE0,0xF1,0x51,0xEC,0xAE]],
						  [[0xA0,0xA1,0xA2,0xA3,0xA5,0xA6,0xA7,0xA8,0xAA,0xAB,0xAC,0xAD,0xAF,0xB0,0xB1,0xB2,0xB4,0xB5,0xB6,0xB7,0xB9,0xBA,0xBB,0xBC,0xBE,0xBF,0xC0,0xC1,0xC3,0xC4,0xC5,0xC6],[0xEE,0x99,0x32,0xB3,0x72,0x18,0x04,0xD5,0xA8,0x3E,0xF5,0x94,0x92,0x45,0xB6,0xF6],[0xF5,0xD6,0xFF,0x41,0x4F,0xD2,0xC6,0x18,0x14,0x94,0xD2,0x0C,0x37,0xF2,0xB8,0xC4]],
						  [[0xC8,0xC9,0xCA,0xCB,0xCD,0xCE,0xCF,0xD0,0xD2,0xD3,0xD4,0xD5,0xD7,0xD8,0xD9,0xDA,0xDC,0xDD,0xDE,0xDF,0xE1,0xE2,0xE3,0xE4,0xE6,0xE7,0xE8,0xE9,0xEB,0xEC,0xED,0xEE],[0xE6,0x24,0x8F,0x55,0xC5,0xFD,0xCB,0xCA,0x9C,0xBB,0xB0,0x1C,0x88,0xA2,0xEA,0x77],[0x85,0x39,0x9C,0x01,0xF5,0x9F,0xFF,0xB5,0x20,0x4F,0x19,0xF8,0x48,0x2F,0x00,0xB8]],
						  [[0xF0,0xF1,0xF2,0xF3,0xF5,0xF6,0xF7,0xF8,0xFA,0xFB,0xFC,0xFD,0xFE,0x01,0x00,0x02,0x04,0x05,0x06,0x07,0x09,0x0A,0x0B,0x0C,0x0E,0x0F,0x10,0x11,0x13,0x14,0x15,0x16],[0xB8,0x35,0x8E,0x41,0xB9,0xDF,0xF6,0x5F,0xD4,0x61,0xD5,0x5A,0x99,0x26,0x62,0x47],[0x92,0x09,0x7B,0x4C,0x88,0xA0,0x41,0xDD,0xF9,0x81,0x44,0xBC,0x8D,0x22,0xE8,0xE7]],
						  [[0x18,0x19,0x1A,0x1B,0x1D,0x1E,0x1F,0x20,0x22,0x23,0x24,0x25,0x27,0x28,0x29,0x2A,0x2C,0x2D,0x2E,0x2F,0x31,0x32,0x33,0x34,0x36,0x37,0x38,0x39,0x3B,0x3C,0x3D,0x3E],[0xF0,0xE2,0xD7,0x22,0x60,0xAF,0x58,0xE2,0x1E,0x01,0x5A,0xB3,0xA4,0xC0,0xD9,0x06],[0x89,0xBD,0x5B,0x73,0xB3,0x56,0xAB,0x41,0x2A,0xEF,0x9F,0x76,0xCE,0xA2,0xD6,0x5C]],
						  [[0x40,0x41,0x42,0x43,0x45,0x46,0x47,0x48,0x4A,0x4B,0x4C,0x4D,0x4F,0x50,0x51,0x52,0x54,0x55,0x56,0x57,0x59,0x5A,0x5B,0x5C,0x5E,0x5F,0x60,0x61,0x63,0x64,0x65,0x66],[0x47,0x5B,0x8B,0x82,0x3C,0xE8,0x89,0x3D,0xB3,0xC4,0x4A,0x9F,0x2A,0x37,0x9F,0xF7],[0x25,0x36,0x96,0x90,0x93,0xC5,0x5F,0xF9,0x45,0x46,0x92,0xF2,0xFA,0xC2,0xF5,0x30]],
						  [[0x68,0x69,0x6A,0x6B,0x6D,0x6E,0x6F,0x70,0x72,0x73,0x74,0x75,0x77,0x78,0x79,0x7A,0x7C,0x7D,0x7E,0x7F,0x81,0x82,0x83,0x84,0x86,0x87,0x88,0x89,0x8B,0x8C,0x8D,0x8E],[0x68,0x8F,0x52,0x81,0x94,0x58,0x12,0x86,0x2F,0x5F,0x30,0x76,0xCF,0x80,0x41,0x2F],[0x07,0xFC,0x76,0xA8,0x72,0x84,0x3F,0x3F,0x6E,0x00,0x81,0xEE,0x93,0x96,0xD6,0x37]],
						  [[0x90,0x91,0x92,0x93,0x95,0x96,0x97,0x98,0x9A,0x9B,0x9C,0x9D,0x9F,0xA0,0xA1,0xA2,0xA4,0xA5,0xA6,0xA7,0xA9,0xAA,0xAB,0xAC,0xAE,0xAF,0xB0,0xB1,0xB3,0xB4,0xB5,0xB6],[0x08,0xD1,0xD2,0xBC,0x75,0x0A,0xF5,0x53,0x36,0x5D,0x35,0xE7,0x5A,0xFA,0xCE,0xAA],[0xE3,0x8B,0xA8,0xEC,0x2A,0xA7,0x41,0x35,0x8D,0xCC,0x93,0xE8,0xF1,0x41,0xC4,0x91]],
						  [[0xB8,0xB9,0xBA,0xBB,0xBD,0xBE,0xBF,0xC0,0xC2,0xC3,0xC4,0xC5,0xC7,0xC8,0xC9,0xCA,0xCC,0xCD,0xCE,0xCF,0xD1,0xD2,0xD3,0xD4,0xD6,0xD7,0xD8,0xD9,0xDB,0xDC,0xDD,0xDE],[0x87,0x07,0x12,0x1F,0x47,0xCC,0x3E,0xFC,0xEC,0xA5,0xF9,0xA8,0x47,0x49,0x50,0xA1],[0xD0,0x28,0xEE,0x23,0xE4,0xA8,0x90,0x75,0xD0,0xB0,0x3E,0x86,0x8D,0x7D,0x3A,0x42]],
						  [[0xE0,0xE1,0xE2,0xE3,0xE5,0xE6,0xE7,0xE8,0xEA,0xEB,0xEC,0xED,0xEF,0xF0,0xF1,0xF2,0xF4,0xF5,0xF6,0xF7,0xF9,0xFA,0xFB,0xFC,0xFE,0xFE,0x01,0x01,0x03,0x04,0x05,0x06],[0xE5,0x1A,0xA0,0xB1,0x35,0xDB,0xA5,0x66,0x93,0x9C,0x3B,0x63,0x59,0xA9,0x80,0xC5],[0x8C,0xD9,0x42,0x3D,0xFC,0x45,0x9E,0x54,0x71,0x55,0xC5,0xD1,0xD5,0x22,0xE5,0x40]],
						  [[0x08,0x09,0x0A,0x0B,0x0D,0x0E,0x0F,0x10,0x12,0x13,0x14,0x15,0x17,0x18,0x19,0x1A,0x1C,0x1D,0x1E,0x1F,0x21,0x22,0x23,0x24,0x26,0x27,0x28,0x29,0x2B,0x2C,0x2D,0x2E],[0x06,0x9A,0x00,0x7F,0xC7,0x6A,0x45,0x9F,0x98,0xBA,0xF9,0x17,0xFE,0xDF,0x95,0x21],[0x08,0x0E,0x95,0x17,0xEB,0x16,0x77,0x71,0x9A,0xCF,0x72,0x80,0x86,0x04,0x0A,0xE3]],
						  [[0x30,0x31,0x32,0x33,0x35,0x36,0x37,0x38,0x3A,0x3B,0x3C,0x3D,0x3F,0x40,0x41,0x42,0x44,0x45,0x46,0x47,0x49,0x4A,0x4B,0x4C,0x4E,0x4F,0x50,0x51,0x53,0x54,0x55,0x56],[0x72,0x61,0x65,0xC1,0x72,0x3F,0xBC,0xF6,0xC0,0x26,0xD7,0xD0,0x0B,0x09,0x10,0x27],[0x7C,0x17,0x00,0x21,0x1A,0x39,0x91,0xFC,0x0E,0xCD,0xED,0x0A,0xB3,0xE5,0x76,0xB0]]];

	var res = true;
	var j = 0;
	for (var i = 0; i < testvectors128.length; i++) {
		var res2 = test_aes(testvectors128[i][1],testvectors128[i][0],testvectors128[i][2]);
		res &= res2;
		if (!res2) {
			result[j] = new test_result("Testing 128 bit key vector with block "+
				util.hexidump(testvectors128[i][1])+
				" and key "+util.hexidump(testvectors128[i][0])+
				" should be "+util.hexidump(testvectors128[i][2]),
				false);
			j++;
		}
	}
	if (res) {
		result[j] = new test_result("128 bit key test vectors completed.",true)
		j++;
	}
	
	res = true;
	for (var i = 0; i < testvectors192.length; i++) {
		var res2 = test_aes(testvectors192[i][1],testvectors192[i][0],testvectors192[i][2]);
		res &= res2;
		if (!res2) {
			result[j] = new test_result("Testing 192 bit key vector with block "+
				util.hexidump(testvectors192[i][1])+
				" and key "+util.hexidump(testvectors192[i][0])+
				" should be "+util.hexidump(testvectors192[i][2]),
				false);
			j++;
		}
	}
	if (res) {
		result[j] = new test_result("192 bit key test vectors completed.",true)
		j++;
	}

	res = true;
	for (var i = 0; i < testvectors256.length; i++) {
		var res2 = test_aes(testvectors256[i][1],testvectors256[i][0],testvectors256[i][2]);
		res &= res2;
		if (!res2) {
			result[j] = new test_result("Testing 256 bit key vector with block "+
				util.hexidump(testvectors256[i][1])+
				" and key "+util.hexidump(testvectors256[i][0])+
				" should be "+util.hexidump(testvectors256[i][2]),
				false);
			j++;
		}
	}
	if (res) {
		result[j] = new test_result("256 bit key test vectors completed.", true)
		j++;
	}

	return result;
});

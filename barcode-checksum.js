/**
 * производит вычисление контрольной суммы ШПИ и возвращает полный ШПИ
 * @param {string|number} barcodeWithoutChecksum, ШПИ без контрольной суммы
 * @returns {string}, ШПИ с контрольной суммой
 */
module.exports.getFullBarcode = function(barcodeWithoutChecksum) {
   try {
      if(barcodeWithoutChecksum.toString().match(/^[0-9]{13}$/)) {
         let numArr = Array.from(String(parseInt(barcodeWithoutChecksum)), Number)
         let even = 0;
         let uneven = 0;
         for(let i = 0; i < numArr.length; i++) {
            if(i % 2 == 0) {
               even += numArr[i];
            }
            if(i % 2 != 0) {
               uneven += numArr[i];
            }
         }
         let triple = even * 3;
         let tripleEvenUneven = triple + uneven;
         let ostat = tripleEvenUneven % 10;
         let controlSum = ostat == 0 ? ostat : 10 - ostat;
         return barcodeWithoutChecksum + controlSum.toString();
      } else {
         throw new Error('String or number of 13 digits required')
      }
   } catch(error) {
      return error;
   }
}

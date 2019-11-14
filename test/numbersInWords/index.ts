import { expect } from 'chai'
import 'mocha'
import { numberToWords } from './../../src/numbersInWords'

describe('Numbers in Words', () => {
  describe('numberToWords', () => {
    it('converts 0 to zero', () => {
      expect(numberToWords(0)).to.equal('zero')
    })

    it('converts 10 to ten', () => {
      expect(numberToWords(10)).to.equal('ten')
    })

    it('converts 19 to nineteen', () => {
      expect(numberToWords(19)).to.equal('nineteen')
    })

    it('converts 20 to twenty', () => {
      expect(numberToWords(20)).to.equal('twenty')
    })

    it('converts 21 to twenty one', () => {
      expect(numberToWords(21)).to.equal('twenty one')
    })

    it('converts 99 to ninety nine', () => {
      expect(numberToWords(99)).to.equal('ninety nine')
    })

    it('converts 100 to one hundred', () => {
      expect(numberToWords(100)).to.equal('one hundred')
    })

    it('converts 101 to one hundred and one', () => {
      expect(numberToWords(101)).to.equal('one hundred and one')
    })

    it('converts 123 to one hundred and twenty three', () => {
      expect(numberToWords(123)).to.equal('one hundred and twenty three')
    })

    it('converts 1,000 to one thousand', () => {
      expect(numberToWords(1_000)).to.equal('one thousand')
    })

    it('converts 12,345,678 to twelve million, three hundred and forty five thousand, six hundred and seventy eight', () => {
      expect(numberToWords(12_345_678)).to.equal('twelve million, three hundred and forty five thousand, six hundred and seventy eight')
    })
  })
})
import { expect } from 'chai'
import 'mocha'
import { buildDiamond } from './../../src/diamond'

describe('Diamond', () => {
  describe('buildDiamond', () => {
    it('builds a diamond for the letter A', () => {
      expect(buildDiamond('A')).to.deep.equal(['A'])
    })

    it('builds a diamond for the letter B', () => {
      expect(buildDiamond('B')).to.deep.equal([' A ', 'B B', ' A '])
    })

    it('builds a diamond for the letter D', () => {
      expect(buildDiamond('D')).to.deep.equal([
        '   A   ',
        '  B B  ',
        ' C   C ',
        'D     D',
        ' C   C ',
        '  B B  ',
        '   A   '
      ])
    })

    it('returns an empty array if the target is invalid', () => {
      expect(buildDiamond('9')).to.deep.equal([])
    })
  })
})
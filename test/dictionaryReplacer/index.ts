import { expect } from 'chai'
import 'mocha'
import { replace } from './../../src/dictionaryReplacer'

describe('Dictionary Replacer', () => {
  describe('replace', () => {
    it('converts an empty string to an empty string', () => {
      expect(replace('', { name: 'John Doe' })).to.equal('')
    })

    it('returns the original string if there are no replacements', () => {
      expect(replace('the original', { name: 'John Doe' })).to.equal('the original')
    })

    it('replaces a single template key', () => {
      expect(replace('Hello, $name$', { name: 'World' })).to.equal('Hello, World')
    })

    it('replaces a multiple template keys', () => {
      expect(replace('$greeting$, $name$', { greeting: 'Hello', name: 'World' })).to.equal('Hello, World')
    })

    it('it leaves unknown keys intact', () => {
      expect(replace('Hello, $name$', { greeting: 'Howdy' })).to.equal('Hello, $name$')
    })
  })
})
/**
 * Javascript implementation of Vigenère cipher
 *
 * "The Vigenère cipher is a method of encrypting alphabetic text by using
 * a series of different Caesar ciphers based on the letters of a keyword.
 * It is a simple form of polyalphabetic substitution." -Wikipedia
 *
 * @author Vegard Løkken <vegard@loekken.org>
 * @copyright 2015 Vegard Løkken
 * @license MIT
 * @version 0.0.2
 */
;(function()
{
    'use strict';

    /**
     * Constructor for the Vigenere object
     *
     * @param {string} key The encryption key
     */
    function Vigenere(key)
    {
        this.key = key;
    }

    /**
     * Alphabet to use in encrypted string. Characters in the message/key that
     * is not in this alphabet will be used as is, without being encrypted
     */
    Vigenere.prototype.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
            'abcdefghijklmnopqrstuvwxyz .,?!-_;:+1234567890"';

    /**
     * Method to encrypt a given string
     *
     * @param {string} msg The message to encrypt
     * @param {bool} decrypt Internal argument used by decrypt()
     */
    Vigenere.prototype.encrypt = function(msg, decrypt)
    {
        if (!this.key) return msg;

        var code = '', msgChr, keyChr, msgPos, keyPos, alphPos;

        for (var i=0; i<msg.length; i++)
        {
            msgChr = msg.charAt(i);
            keyChr = this.key.charAt(i % this.key.length);

            msgPos = this.alphabet.indexOf(msgChr);
            keyPos = this.alphabet.indexOf(keyChr);

            /* If msgChr og keyChr is not present in alphabet,
             * use it unencrypted */
            if (msgPos < 0 || keyPos < 0)
            {
                code += msgChr;
            }
            else
            {
                if (!decrypt)
                {
                    alphPos = (msgPos + keyPos) % this.alphabet.length;
                }
                else
                {
                    alphPos = msgPos - keyPos;

                    if (alphPos < 0)
                    {
                        alphPos += this.alphabet.length;
                    }
                }

                code += this.alphabet.charAt(alphPos);
            }
        }

        return code;
    };

    /**
     * Method to decrypt a previously encrypted message
     *
     * @param {string} code The encrypted code
     */
    Vigenere.prototype.decrypt = function(code)
    {
        return this.encrypt(code, true);
    };

    // Browser
    if (typeof(window) !== 'undefined')
        window.Vigenere = Vigenere;

    // Node.js
    if (typeof(module) !== 'undefined')
        module.exports = { Vigenere: Vigenere };

/*
    // Demonstration
    var secret = 'curious',
        v = new Vigenere(secret),
        msg = 'Encrypting text can be useful if you want to keep your secrets',
        encrypted = v.encrypt(msg),
        decrypted = v.decrypt(encrypted);

    console.log('Encrypting following text with secret \'' + secret + '\':');
    console.log(msg + '\n');
    console.log('Encrypted:\n' + encrypted + '\n');
    console.log('Decrypted:\n' + decrypted);
*/
})();

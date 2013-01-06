ipa.js
========

A (probably incredibly sloppy) Javascript port of Silas S Brown's [lexconverter](http://people.ds.cam.ac.uk/ssb22/gradint/lexconvert.html). This, in conjunction with speak.js, can read aloud IPA strings in the browser.

People cannot seem to pronounce my surname so, after working out my preferred pronunciation in the International Phonetic Alphabet, I made a guide available on my website. But apparently a) people don't read my website and b) most people can't read IPA. Rather than record my own voice, I thought I might give a javascript synthesizer a try.

Usage
--------

Using it is very simple.

* Include speak.js files and ipa.js in your document header

      ```
<script src="ipa.js"></script>
<script src="./speak.js/speakClient.js"></script>
<script src="./speak.js/speakGenerator.js"></script>
      ```

* For speak.js, add a div with an audio element called 'audio' in your html body,

      `<div id="audio"></div>`

* Pass the output from ipa to speak.play() to read aloud the IPA

      `speak.play(ipa('hɛˈloʊ̯ wɝld'));`

I've stuck a basic example in example.html. To be honest, it's not really very good.

Using the speak.js options
--------

Check out the [readme within the submodule](https://github.com/newsky/speak.js/blob/master/README.markdown) for adjusting speed, pitch, etc and for pausing and resuming playback.

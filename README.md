# HyperTerm Lastpass

> Lastpass plugin for autofilling passwords in HyperTerm.

## About

I have admired [`hyperterm-1password`][1] because it seemed like such a cool
idea, but I have always used Lastpass! This made me quite jealous, so I went
ahead and created [`lastpass-node`][2] because there were no Node.js clients yet
for Lastpass (_sigh_). Then I created this cool plugin! Finally, an easy way to
fill in my passwords easily with HyperTerm 🎉

Lastpass vaults are stored locally and are encrypted. The plugin will try to
clear decrypted accounts from memory as soon as possible, too.

<!-- lint disable no-emphasis-as-heading -->
**I am not a security expert, and I am not liable for any problems that may
arise due to using this plugin.**
<!-- lint enable no-emphasis-as-heading -->

![alt demo](http://i.giphy.com/l3fQndLP7SVAIXgWc.gif)

### How to use

1.  Either click the `Plugins > Lastpass` menu item or use `Cmd or Ctrl + L`.
2.  Enter your Lastpass username and password.
3.  If you need to enter a 2 factor authentication pin, enter it.
4.  Search for the password you want to enter.
5.  Click on the row you would like to autofill a password with.
6.  ????
7.  PROFIT!!!

### Caveats

There's currently no way of updating your Lastpass vault locally. The vaults are
stored to `~/.lastpass-vault-${USERNAME}`, delete the vault you'd like to update
and re-login to update the vault.

[1]: https://github.com/sibartlett/hyperterm-1password
[2]: https://github.com/dfrankland/lastpass-node

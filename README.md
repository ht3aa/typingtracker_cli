# Typing Tracker CLI
Node cli used to calculate and filter the files that store the time you spent typing in neovim or lunarvim.

## Important Notes
You should copy the content of [typingTracker.lua](https://github.com/ht3aa/neovimConfig/blob/main/lua/extra/typingTracker.lua) file in your neovim config.
Then add this code to the end
```
vim.cmd([[autocmd VimLeave * lua SaveCodeTracker()]])
```
so That when you exit neovim it will save your typing time in a file named as the same name of your working directory.
The working directory should have .git folder inside it to work.

## Usage
After you done the steps in Important Notes section. you can install typingtracker cli package

```
npm install -g typingtracker
```

after installing it you should allow to the premission to that package to be updated with the new records.
to see where is your package installed run this command

```
npm root -g
```
this will output something like this "/usr/local/lib/node_modules" (if you are linux user) then


```
sudo chown -R <username> /usr/local/lib/node_modules/typingtracker
```

after that you can run 
```
typingtracker
```
enjoy seeing your typing time.

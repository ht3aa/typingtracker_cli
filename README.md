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
After you done the steps in Important Notes section. first you need to run neovim and make some movement or typing and then quit so that the folders and data will be created and stored in /tmp/typingtracker/workFiles/ path. You can then install typingtracker cli package

```
sudo npm install -g typingtracker@latest 
```

after that you can run 
```
typingtracker
```
enjoy seeing your typing time.

## Update
if your package not updating just uninstall it

```
sudo npm uninstall -g typingtracker
```

then install it 

```
sudo npm install -g typingtracker@latest
```

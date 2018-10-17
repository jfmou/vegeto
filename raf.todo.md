TODO / braindump

* Package cli command in a single makefile :
* Delete .galery-container

```bash
# List and Rename every .jpg picture in current folder as a sequence (1.jpg, 2.jpg, 3.jpg, ...) :
ls | cat -n | while read n f; do mv "$f" "$n.jpg"; done

 # generate small thumbnails (forces max width of img in 350px and rename with suffix -small while keeping basename):
convert img/*.jpg -resize 350x -set filename:base "%[basename]" "img/%[filename:base]-small.jpg"

# Generate base64 inline img based on base imagine
base64 <path/to/img>

# Generate a .jpg reduce by 50% on quality
convert <Name> -quality 50 <name>.jpg
```

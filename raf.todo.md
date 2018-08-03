TODO / braindump
* Split mandatory css and inline it for faster loading times
* Animate logo for mobile and/or desktop ?
* jQuery custom build ?
* Bosser typo en tout genre et illustration
* Title on images in gallery
* Package cli command in a single makefile :

```bash
# Rename every .jpg picture in src folder as a sequence (1.jpg, 2.jpg, 3.jpg, ...) :
ls | cat -n | while read n f; do mv "$f" "$n.jpg"; done

 # generate small thumbnails (forces max width of img in 350px and rename with suffix -small while keeping basename):
convert img/*.jpg -resize 350x -set filename:base "%[basename]" "img/%[filename:base]-small.jpg"
```

run(){
  echo "[RUN] " $*
  $*
  if [ $? -ne 0 ] ;then
      echo "[ERROR] fail"
      exit 1
  fi
}
run npm run release
run npm run build
run npm publish
run git push --follow-tags

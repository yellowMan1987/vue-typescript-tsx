rm -rf dist

yarn build


tar -C dist -zcvf Vtx-$(date +%F).tar.gz *
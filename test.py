#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Author: JerryWang
# @Date:   2015-07-13 23:31:17
# @Last Modified by:   JerryWang
# @Last Modified time: 2015-07-13 23:50:49


import qiniu

q = qiniu.Auth('0V3pdbcLhNOuUTs71Q-ynVTx3CM8DJZ0Va5Y9BiF', 'RNB_fJHHlIEPT1W1gHarFf22VDBNj5qeo-34SS5N')
##my self
q = qiniu.Auth('UNIFT3Dh3-4HYCR-OjoSADE8wPdu56O69AnQGr_j', 'HlakF9gZcDiikkjkJ5rOftO_kYNOcOcoVRElrHQW')
# token = q.upload_token('kunlun')
localfile = __file__
key = 'test_file'
mime_type = "text/plain"
params = {'x:a': 'a'}

token = q.upload_token('dotafans')
ret, info = qiniu.put_file(token, key, localfile, mime_type=mime_type, check_crc=True)
print(token)
assert ret['key'] == key
assert ret['hash'] == qiniu.utils.etag(localfile)
#!/usr/bin/env python
import os
import sys
import subprocess
import time
from pathlib import Path

from fabric import Connection

#ssh-copy-id -i ~/.ssh/id_rsa.pub root@tpu
# chmod og+rwx -R build/


REMOTE_HOST = "bobah@forpost"


def timer_func(func):
    def tmp(*args, **kwargs):
        t = time.time()
        res = func(*args, **kwargs)
        print('func: %s, time: %.4f sec.' % (
            func.__name__, time.time() - t))
        return res
    return tmp



def build_frontend(BUILD_DIR):
    os.environ["NODE_ENV"] = "production"

    command = 'cd {} && yarn run build'.format(BUILD_DIR)
    print(command)

    proc = subprocess.Popen(['/bin/bash', '-i', '-c', 'nvm use 22.15.0; {}'.format(command)],
                     executable='/usr/bin/bash', env=os.environ)
    proc.communicate()

    exit_code = proc.wait()
    if exit_code != 0:
        sys.exit("Exit message here")


def deploy_frontend():
    c = Connection(REMOTE_HOST)
    c.run("uname -a", pty=False)

    BUILD_DIR = '/home/bobah/projects/tsg/fort360new'

    build_frontend(BUILD_DIR)

    # dist
    DISTR_DIR = "/home/bobah/projects/tsg/fort360new/dist/"
    REMOTE_DIR = "/opt/tsg/fort360/public/"

    # remove old
    command = "rm -rf {}".format(REMOTE_DIR)
    print(command)
    c.run(command)

    command = "mkdir {}".format(REMOTE_DIR)
    print(command)
    c.run(command)

    # copy
    EXCLUDE = []
    command = 'rsync -r '
    for exclude in EXCLUDE:
        command += '--exclude "{}" '.format(exclude)

    command += '"{}" "{}:{}"'.format(DISTR_DIR, REMOTE_HOST, REMOTE_DIR)
    print(command)
    os.system(command)

    command = "chmod g+rX -R {}".format(REMOTE_DIR)
    #command = "chown www-data:www-data -R {}build/".format(REMOTE_DIR)
    print(command)
    c.run(command)


    # remove local build
    command = 'rm -rf {}/dist'.format(BUILD_DIR)
    print(command)
    os.system(command)



@timer_func
def main():
    deploy_frontend()


if __name__ == '__main__':
    main()



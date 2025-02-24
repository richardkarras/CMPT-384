# VGA Assignments

There are a set of tasks that help you to understand using VGA platform.

First, you should start a simple HTTP server. For example, you can use

```sh
# with Python
python -m http.server
```

or the more prefered one (the `-c-1` argument disables the cache)

```sh
# with NodeJS
npx http-server -c-1
```

Then, assuming the server is on `http://localhost:8000` (**NOTE that the port
might differ**), you can open the browser and navigate to that address.

For each task, you should naviagate to the coresponding path. For example, for
task 1, you should navigate to
`http://127.0.0.1:8000/tasks/1_first-plugin/index.html`. If you are using the
above mentioned ways to start the HTTP server, you can go to
`http://127.0.0.1:8000/tasks/` for a list of task directories.

Each time you modify the code or the configuration file, you might want to
refresh the page to see the updates. **Sometimes the browser cache may block you
to see the updates if we do not disable cache of the HTTP server, you could try
do a hard refresh or toggle on the "disable cache" option in the browser's dev
tools.**

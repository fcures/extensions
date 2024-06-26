// Nothing here yet, just testing stuff out.And some tests with html.

<!DOCTYPE html>
<html>
<head>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/brython/3.9.5/brython.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/brython/3.9.5/brython_stdlib.min.js"></script>
</head>
<body onload="brython()">
    <textarea id="python-code" rows="10" cols="50"># Type your Python code here</textarea><br>
    <button onclick="runPython()">Run Python Code</button><br>
    <pre id="output"></pre>
    <script type="text/python" id="python-script">
        # This is where you put your Python code
        def hello_world():
            print("Hello, world from Python!")

        hello_world()
    </script>
    <script type="text/javascript">
        function runPython() {
            var pythonScript = document.getElementById("python-script").textContent;
            var output = document.getElementById("output");

            // Clear previous output
            output.textContent = '';

            // Run Python code using Brython
            try {
                brython({debug: true, indexedDB: true});
            } catch (err) {
                output.textContent = "Error running Python code: " + err;
            }
        }
    </script>
</body>
</html>

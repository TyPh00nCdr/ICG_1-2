/**
 * Created by Niklas Hennings @ 3henning on 26.10.15.
 * Based on a template by ICG @ HCI.
 */
var gl;

// Specify position of the vertices
var vertices = new Float32Array([-0.5, 0,
                                  0.5, 0]);

var size = new Float32Array([10.0]);

window.onload = function init()
{
    // Get canvas and setup webGL

    var canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    // Specify color of the vertices

    var colors = new Float32Array([ 1, 0, 0, 1,
                                    0, 0, 1, 1]);

    // Configure viewport

    gl.viewport(0,0,canvas.width,canvas.height);
    gl.clearColor(1.0,1.0,1.0,1.0);

    // Init shader program and bind it

    var program = initShaders(gl, "vertex-shader", "fragment-shader");

    gl.useProgram(program);

    // Load colors into the GPU and associate shader variables

    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);


    // Load positions into the GPU and associate shader variables

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);


    // Load squares' size into the GPU and associate shader variables

    var sizeBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sizeBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, size, gl.STATIC_DRAW);

    var vSize = gl.getAttribLocation(program, "vSize");
    gl.vertexAttribPointer(vSize, 1, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vSize);

    alert("Color var: " + vColor + " | Pos var: " + vPosition + " | Size var: " + vSize);

    render();
};

function render()
{
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 2);
}

function process()
{
    var size = document.getElementById("size").value;
    var unit = document.getElementById("unit").value;
    var ratio = screen.width / screen.height;

    if (unit.localeCompare("Zoll") == 0)
    {
        size *= 25.4;
    }
    else
    {
        size *= 10.0;
    }

    var hoehe = (size) / Math.sqrt(Math.pow(ratio, 2) + 1.0);
    // var breite = hoehe * ratio;

    var pixelPerMM = screen.height / hoehe;
}
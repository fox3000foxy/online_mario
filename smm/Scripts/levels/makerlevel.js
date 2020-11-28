/* FORMAT OF A LEVEL FOR JSON SERIALIZATION:
	{
		height: int,
		width: int,
		data: array[array],
		id: int,
		background: int
	}
*/

function convertlevel()
{
document.write("<br><br>")
var code = jsontable.split("|")[0]
bg = jsontable.split("|")[1].split("&")[0]
// alert(bg)
x = jsontable.split("x:")[1].split("-")[0]
// alert(x)
y = jsontable.split("y:")[1].split("}")[0]

// alert(x)
document.write("<script>jsontable = new Array();jsontable = "+code+"<\/script>")
//document.write("here")
//try{alert(jsontable[1][3])}catch(e){alert(e)}
newtable = new Array()
result = "["
for(i=0;i<jsontable[0].length;i++)
{
				result += "["
				newtable[i] = new Array()
				for (j=0;j<jsontable.length;j++)
				{
								//console.log(i+","+j)
								//alert(jsontable[j][i])
								newtable[i][j] = jsontable[j][i]
				      result += "'"+newtable[i][j]+"',"
				}
				//document.write(newtable)
				result += "],"+unescape("%0D%0A")
}
result+= "],"
}


if (location.href.split("?editor=")[1].split("&")[0]=="0")
	{var jsontable = prompt("Code :","")
	localStorage.setItem("level",jsontable)
    convertlevel()
    }
else if (location.href.split("?editor=")[1].split("&")[0]=="2")
	{
            var jsontable = document.cookie.split("editorresult=")[1]
    convertlevel()
    }
    else if (location.href.split("?editor=")[1].split("&")[0]=="3")
	{
            var jsontable = localStorage.getItem("level")
        convertlevel()
    }
        else if (location.href.split("?editor=")[1].split("&")[0]=="4")
	{
            var jsontable = localStorage.getItem("level")
        convertlevel()
    }
document.write("<script>var definedLevels = [{data:"+result+"width: undefined,height: undefined,id: 0,background: "+bg+",x:"+x+",y:"+y+"}];try{for(n=0;n<definedLevels.length;n++){definedLevels[n].height = definedLevels[0].data[0].length + 1;definedLevels[n].width = definedLevels[0].data.length;}}catch(e){alert(e)};//alert(definedLevels)</script>")

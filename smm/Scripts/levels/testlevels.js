/* FORMAT OF A LEVEL FOR JSON SERIALIZATION:
	{
		height: int,
		width: int,
		data: array[array],
		id: int,
		background: int
	}
*/

var definedLevels = [
{
	data:
	[
	['' ,'' ,'' ,'mario' , 'coin' , 'grass_top_left_rounded' , 'soil_left'],
	['' ,'' ,'' ,'grass_top' , '' , 'grass_top' , 'soil'],
	['' ,'' ,'' ,'' , 'bush_left' , 'grass_top' , 'soil'],
	['' ,'' ,'' ,'' , 'bush_right' , 'grass_top' , 'soil'],
	['' ,'' ,'' ,'' , 'ballmonster' , 'grass_top' , 'soil'],
	['' ,'' ,'' ,'' , '' , 'grass_top' , 'soil'],
	['' ,'' ,'' ,'' , 'coin' , 'grass_top' , 'soil'],
	['' ,'' ,'' ,'' , '' , 'grass_top' , 'soil'],
    ['' ,'' ,'' ,'' , '' , 'grass_top' , 'soil'],
    ['' ,'' ,'' ,'' , '' , 'grass_top' , 'soil'],
    ['' ,'' ,'' ,'' , '' , 'grass_top' , 'soil'],
    ['' ,'' ,'' ,'' , '' , 'grass_top' , 'soil'],
    ['' ,'' ,'' ,'' , 'pipe_top_left' , 'pipe_left_grass' , 'pipe_left_soil'],
    ['' ,'' ,'' ,'' , 'pipe_top_right' , 'pipe_right_grass' , 'pipe_right_soil'],
    ['' ,'' ,'' ,'' , '' , 'grass_top' , 'soil'],
    ['' ,'' ,'' ,'' , '' , 'grass_top' , 'soil'],
    ['' ,'' ,'' ,'' , '' , 'grass_top' , 'soil'],
    ['' ,'' ,'' ,'' , '' , 'grass_top' , 'soil'],
    ['' ,'' ,'' ,'' , '' , 'grass_top' , 'soil'],
    ['' ,'' ,'' ,'' , 'shell' , 'grass_top_right_rounded' , 'soil_right'],
    ['' ,'' ,'' ,'' , '' , '' , 'coin'],
    ['' ,'' ,'' ,'' , 'grass_top_left_rounded' , 'soil_left' , 'soil_left'],
    ['' ,'' ,'' ,'' , 'grass_top_right_rounded' , 'soil_right' , 'soil_right'],
    ['' ,'' ,'' ,'' , '' , '' , ''],
    ['' ,'' ,'' ,'grass_top_left_rounded' , 'soil_left' , 'soil_left' , 'soil_left'],
    ['' ,'' ,'' ,'grass_top_right_rounded' , 'soil_right' , 'soil_right' , 'soil_right'],
    ['' ,'' ,'' ,'' , '' , '' , ''],
    ['' ,'' ,'grass_top_left_rounded' , 'soil_left' , 'soil_left', 'soil_left' , 'soil_left'],
    ['' ,'' ,'grass_top_right_rounded' , 'soil_right' , 'soil_right', 'soil_right' , 'soil_right'],
    ['' ,'' ,'' ,'' , '' , '' , ''],
    ['' ,'' ,'' ,'' , '' , 'grass_top_left_rounded' , 'soil_left'],
    ['' ,'' ,'' ,'' , '' , 'grass_top' , 'soil'],
    ['' ,'' ,'' ,'' , '' , 'grass_top' , 'soil'],
    ['' ,'' ,'' ,'' , '' , 'grass_top' , 'soil'],
    ['' ,'' ,'' ,'' , '' , 'grass_top' , 'soil'],
    ['' ,'' ,'' ,'' , '' , 'grass_top' , 'soil'],
    ['' ,'' ,'' ,'' , '' , 'grass_top' , 'soil'],
    ['' ,'' ,'' ,'' , '' , 'grass_top' , 'soil'],
    ['' ,'' ,'' ,'' , '' , 'grass_top' , 'soil'],
    ['' ,'' ,'' ,'' , '' , 'grass_top_right_rounded' , 'soil_right'],

    ['' ,'' ,'' ,'' , '' , '' , '']
    ],
   width: undefined,
	height: undefined,
	id: 0,
	background: 1,
}
];

for(n=0;n<definedLevels.length;n++){
definedLevels[n].width = definedLevels[0].data.length + 1
definedLevels[n].height = definedLevels[0].data[0].length + 1
}//alert(definedLevels[0].width)

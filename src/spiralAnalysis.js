const SpiralAnalysis = (props) => {

    var total_angle = 0
    var avg_slope = 0
    // Calculation of Average Slope and Total Angle 
    // Come back, might be broken
    for (let a = 1; a < props.data.length;a++){
        
        const angle_diff = (Math.atan(props.data[a][1]/props.data[a][0])-Math.atan(props.data[a-1][1]/props.data[a-1][0]))
        //console.log(angle_diff*57.2958)
        const slope = (((props.data[a][1]-props.data[a-1][1])/(props.data[a][0]-props.data[a-1][0]))/angle_diff)^2
        avg_slope += slope
        total_angle += angle_diff

    }

    const firstOrderSmoothness = (total_angle,avg_slope) =>{
    var res = (1/total_angle)*(avg_slope)
    return Math.log(res)
    }

    const secondOrderSmoothness = () =>{

    }


    const secondZeroCrossingRate = () =>{

    }

    
    if (!props){
        return <div>Error, Please Draw A Spiral</div>
    }else{

        return ( 
            //<div>{.4615*firstOrderSmoothness()+.0544*secondZeroCrossingRate()-.2331*(firstOrderSmoothness())^2-.0726*(secondOrderSmoothness())^2-.001(secondZeroCrossingRate())^2+.2539*firstOrderSmoothness()*secondOrderSmoothness()+1.3668}</div>
            <div><div>Total Angle: {total_angle}</div>
            <div>Average Slope: {avg_slope}</div>
            <div>First Order Smoothness: {firstOrderSmoothness(total_angle,avg_slope)}</div></div>
            
            );
    }
    
    
}
 
export default SpiralAnalysis;
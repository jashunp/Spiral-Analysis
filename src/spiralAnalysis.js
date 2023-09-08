const SpiralAnalysis = (props) => {

    var total_angle = 0
    var avg_slope = 0
    var avg_slope_der = 0
    var signed_der = 0
    // Calculation of Average Slope and Total Angle 
    // Come back, might be broken
    
    //Cosine Rule to find the angle between two sample points
    const cosRule = (a,b) => {
        const c = Math.sqrt(Math.pow(a,2)+Math.pow(b,2))
        const angle = Math.acos((Math.pow(c,2) - Math.pow(b,2) - Math.pow(a,2))/(-2*a*b))
        return angle
    }
    
    //Calculating the lengths of each point
    const lengths = []
    // const angle_array = [0]
    for (let j = 0; j < props.data.length; j++){
        lengths.push(Math.sqrt(Math.pow(props.data[j][0]-props.center,2) + Math.pow(props.data[j][1]-props.center,2)))
    }


    // First Order Smoothness
    for (let a = 1; a < props.data.length;a++){
        

        let distOverAngle;
        let angle_diff = cosRule(lengths[a],lengths[a-1]);
        // angle_array.push(angle_diff)
        distOverAngle = (lengths[a]-lengths[a-1])/angle_diff
        // console.log(angle_diff);
        total_angle += angle_diff;
        avg_slope += Math.pow(distOverAngle,2)
        avg_slope_der += Math.pow((distOverAngle/angle_diff),2)

        
        //avg_slope += slope

    }
    
    
    // console.log(avg_slope)
    
    const firstOrderSmoothness = (total_angle,avg_slope) => {
        var res = (1/total_angle)*(avg_slope)
        return Math.log(res)
    }

    const secondOrderSmoothness = (total_angle,avg_slope_der) => {
        var res = 1/total_angle*(avg_slope_der)
        return Math.log(res)
    }



    const secondZeroCrossingRate = (signed_der) =>{
        var res = (1/(2*(lengths.length - 1))) * signed_der
        return res
    }

    
    if (!props){
        return <div>Error, Please Draw A Spiral</div>
    }else{

        return ( 
            //<div>{.4615*firstOrderSmoothness()+.0544*secondZeroCrossingRate()-.2331*(firstOrderSmoothness())^2-.0726*(secondOrderSmoothness())^2-.001(secondZeroCrossingRate())^2+.2539*firstOrderSmoothness()*secondOrderSmoothness()+1.3668}</div>
            <div><div>Total Angle: {total_angle}</div>
            <div>Average Slope: {avg_slope}</div>
            <div>First Order Smoothness: {firstOrderSmoothness(total_angle,avg_slope)}</div>
            <div>Second Order Smoothness: {secondOrderSmoothness(total_angle,avg_slope_der)}</div></div>

            );
    }
    
    
}
 
export default SpiralAnalysis;
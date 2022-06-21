import day from '../images/day.svg';
import night from '../images/night.svg';
import dayNight from '../images/day-night.svg';

const TimeIcon = (props) => {
    const startTime = props.startTime;

    let img = day;
    if(startTime>6 && startTime<12){
        img = day;
    }else if(startTime>12 && startTime<16){
        img = dayNight;
    }else{
        img = night;
    }

    return (
        <img class="img-fluid pl-2" src={img} width="35"/>
    );


}

export default TimeIcon;
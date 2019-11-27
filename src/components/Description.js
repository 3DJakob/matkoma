import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import chefhatSVG from '../img/chef-hat.svg'


function Description({recipe, onClick}) {
    console.log(recipe);
    console.log(recipe.difficulty)
    console.log(typeof(recipe.difficulty))

    const DescriptionContainerStyle = {
        margin: 0,
        position: 'absolute',
        bottom: -65,
        width: '100%',
        textAlign: 'left',
        display: 'flex',
        justifyContent: 'space-between'
    }
    const HeaderContainerStyle = {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        marginRight: 10,
        fontSize: '0.8em'
    }
    const TextStyle = {
        margin: 0,
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }
    const CookingHatsContainerStyle = {
        backgroundColor: '#000000ba',
        display: 'inline-flex',
        alignSelf: 'baseline',
        margin: 0
    }
    return (
                <div style={DescriptionContainerStyle}>
                    <div style={HeaderContainerStyle}>
                        <h2 style={TextStyle}>
                            {recipe.title}
                        </h2>
                        <h3 style={TextStyle}>
                            {recipe.cookingTime} min
                        </h3>
                    </div>
                    <div style={CookingHatsContainerStyle}>
                        {CookingHats('Medel')}
                    </div>
                </div>
    );
}

function CookingHats(difficulty) {
    let bools = []
    switch(difficulty) {
        case "Enkel":  
            bools = [true, false, false];
        break;
        case "Medel":
            bools = [true, true, false];
        break;
        case "Avancerad":
            bools = [true, true, true];
        break;

    }
    return (
       bools.map(bool =>CookingHat(bool))
    )
}
function CookingHat(fill) {
    let style = {
        width: 25,
        height: 25,
        opacity: fill ? 1.0 : 0.6
    }
    return (
        <img src={chefhatSVG} alt='difficulty' style={style}></img>
    );
}


export default Description
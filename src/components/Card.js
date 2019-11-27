import React, {} from "react";



function Card({recipe, showFrontSide, onClick}) {
    console.log(recipe);
    console.log(recipe.difficulty)
    console.log(typeof(recipe.difficulty))
    console.log(showFrontSide ? 'rotateY(180deg)' : 'rotateY(0deg)')
    const CardStyle = {
        height: '50vh',
        width: '80vw',
        position: 'relative',
        transition: 'transform 2s',
        transformStyle: 'preserve-3d',
        transform: showFrontSide ? 'rotateY(180deg)' : 'rotateY(0deg)'
    }
    const FrontStyle = {
        backgroundImage: recipe.imageURL,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        boxShadow: '0px 0px 20px 1px #0000006e',
        height: '100%',
        width: '100%',
        position: "absolute",
        backfaceVisibility: 'hidden',
        transform: 'rotateY(180deg)',
    }
    const BackStyle = {
        background: 'red',
        height: '100%',
        width: '100%',
        position: 'absolute',
        backfaceVisibility: 'hidden'
        
    }
    return (
            <div style={CardStyle}>
                <div style={FrontStyle}></div>
                <div style={BackStyle}></div>
            </div>
    );
}


export default Card
import React, { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { gridContainer } from '../utils/exportStyles';
import { home } from '../utils/exportContent';

const Home = () => {
    useLayoutEffect(() => { document.title = "Data Structure Visualizer" }, []);

    return (
        <>       <div className="home-page">
            {/* <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                <h3 style={{ fontSize: "2vw", textTransform: 'uppercase', color: "white" }}>
                    Data Structure and Algorithms Visualizer
                </h3>
            </div> */}
            <div style={gridContainer}>
                {
                    home.map(({ url, name, src, alt }, index) => (
                        <div key={index}>
                            <Link to={url}>
                                <span>{name}</span>
                                <img src={src} alt={alt} />
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
        </>
    );
};

export default Home;

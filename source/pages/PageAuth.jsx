import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Card, Flex, Heading, Text, Container, TextField, Link, Button, Grid } from "@radix-ui/themes";
import FormAuth from '../components/FormAuth';
import Logo from '../components/Logo';

export const PageAuth = () => {
          
    let [filmName,setFilmName] = useState("");

    let navigate = useNavigate();

    function goToFilmDetails() {
      const uri="/details/"+filmName;
      //const uri="/details/"+encodeURIComponent(filmName);
      console.log(uri);
      navigate(uri);
    }

    return (

        <Grid height="100vh" align="center" justify="center" columns="repeat(auto-fill, minmax(345px, 50%))">
            <Logo/>
            <FormAuth/>
        </Grid>

    );
};

        // <input type="text" value={filmName} onChange={ eo => setFilmName(eo.target.value) } /><br/>
        // <input type="button" value="Search" onClick={goToFilmDetails} />
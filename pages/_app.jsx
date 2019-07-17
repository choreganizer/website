import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import Navbar from '../components/Navbar'
import '../styles/application.scss';

export default class extends App {
  render() {
    const { Component } = this.props;

    return (
      <Container>
        <Head>
          <title>choreganizer</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" hid="description" content="handle your chores." />
        </Head>
        <Navbar />
        <Component />
      </Container>
    );
  }
}
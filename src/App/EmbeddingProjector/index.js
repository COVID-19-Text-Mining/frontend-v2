import React from 'react';
import Iframe from 'react-iframe';
import NavMenu from 'App/shared/components/NavMenu';
import { Box } from 'rebass';
import styled from 'styled-components';
import { Container, Grid, Header, Responsive } from 'semantic-ui-react';

const FullGrid = styled.div`
  && {
    position: absolute;
    top: 60px;
    left: 0;
    height: calc(100vh - 60px) !important;
    width: 100vw !important;

    iframe {
      border: none;
      height: calc(100vh - 60px);
      width: 100vw;
    }
  }
`;

function Mobile() {
  return (
    <Responsive {...Responsive.onlyMobile}>
      <Grid>
        <Container>
          <Header as="h1" style={{ marginTop: '30px' }}>
            Please try this page on desktop!
          </Header>
          <p>
            Sorry, but we detected you are using mobile devices. Word embeddings
            projector uses advanced rendering codes and works better on a
            desktop!
          </p>
        </Container>
      </Grid>
    </Responsive>
  );
}

function Desktop() {
  return (
    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
      <FullGrid>
        <Iframe
          url="/_embedding-projector/iframe.html"
          width="100%"
          height="100%"
          id="embedding-projector"
          display="initial"
          position="relative"
        />
      </FullGrid>
    </Responsive>
  );
}

export default function EmbeddingProjector() {
  return (
    <Box width={1}>
      <Box width={1}>
        <NavMenu hidelogo="hide" />
      </Box>

      <>
        <Desktop />
        <Mobile />
      </>
    </Box>
  );
}

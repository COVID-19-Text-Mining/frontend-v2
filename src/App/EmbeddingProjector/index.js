import React, { Component } from 'react';
import Iframe from 'react-iframe';
import NavMenu from 'App/shared/components/NavMenu';
import { Box } from 'rebass';
import styled from 'styled-components';
import {
  Container,
  Grid,
  Header,
  Modal,
  Responsive,
  Button,
  Icon
} from 'semantic-ui-react';

const FullGrid = styled.div`
  && {
    position: absolute;
    top: 55px;
    left: 0;
    height: calc(100vh - 55px) !important;
    width: 100vw !important;

    iframe {
      border: none;
      height: calc(100vh - 55px);
      width: 90vw;
      min-width: ${props => props.minWidth};
      max-width: 1400px;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
`;

export class AlphaModal extends Component {
  state = { modalOpen: true };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    return (
      <Modal open={this.state.modalOpen} onClose={this.handleClose}>
        <Header
          icon="sticky note outline"
          content="COVIDScholar Alpha Feature"
        />
        <Modal.Content>
          <h4>
            This interface is in beta testing and it may change in the near
            future. Please send any feedback/suggestions to jdagdelen@lbl.gov.
          </h4>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={this.handleClose} inverted>
            <Icon name="checkmark" /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

// export function AlphaModal() {
//   return (
//     <Modal open={true} closeIcon>
//       <Modal.Header>COVIDScholar Search Syntax</Modal.Header>
//       <Modal.Content></Modal.Content>
//     </Modal>
//   );
// }

function Mobile() {
  return (
    <Responsive {...Responsive.onlyMobile}>
      <Grid>
        <Container>
          <Header as="h1" style={{ marginTop: '30px' }}>
            Please try this page on desktop!
          </Header>
          <p>
            The word embeddings projector uses advanced rendering codes and
            should be viewed on a desktop/laptop.
          </p>
        </Container>
      </Grid>
    </Responsive>
  );
}

function Desktop() {
  return (
    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
      <AlphaModal />
      <FullGrid minWidth={Responsive.onlyTablet.minWidth}>
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
        <NavMenu />
      </Box>
      <>
        <Desktop />
        <Mobile />
      </>
    </Box>
  );
}

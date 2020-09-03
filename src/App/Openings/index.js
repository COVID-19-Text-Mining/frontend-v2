import React from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';
import Footer from 'App/shared/components/Footer';
import NavMenu from 'App/shared/components/NavMenu';
import styled from 'styled-components';
import { Box } from 'rebass';

const ContentGrid = styled(Grid)`
  &&& {
    min-height: calc(100vh - 130px);
    color: #4e4e4e;
    font-size: 1.1rem;
    margin-top: 0;

    .column {
      padding: 0;
    }

    h1 {
      font-size: 3.5rem;
      font-weight: 300;
    }

    .title {
      margin-bottom: 0;
      margin-left: 10px;
      margin-right: 10px;
    }

    .subtitle {
      margin-top: 0;
      margin-left: 10px;
      margin-right: 10px;
    }

    h4 {
      font-size: 1.1rem;
      margin: 3rem 0 0;
    }

    & .ui.list {
      margin: 0.5rem 0;
    }

    .ui.form {
      max-width: 800px;
      padding: 0 2rem;
    }

    a {
      color: #2b8182 !important;
      font-weight: 600;
      font-weight: normal;
    }

    a:hover {
      color: #1b4b4c !important;
    }

    .ui.card,
    .ui.card:first-child,
    .ui.card:last-child {
      margin: 0.5em;
    }
  }
`;

export default function About() {
  return (
    <Box width={1}>
      <Box width={1}>
        <NavMenu logo="show" />
      </Box>
      <ContentGrid>
        <Container>
          <Header as="h1" style={{ marginTop: '10px' }}>
            Openings
          </Header>
          <Header as="h2" style={{ marginTop: '10px' }}>
            Postdoctoral Scholar
          </Header>
          <p>
            The COVIDScholar project, led by Professor Gerbrand Ceder at
            Lawrence Berkeley National Laboratory currently has a postdoctoral
            position available. COVIDScholar is an effort to aggregate,
            disseminate, and analyse research literature relating to COVID-19.
          </p>
          <p>
            The successful candidate will employ machine learning and natural
            language processing techniques to develop models and produce
            insights from our cross-disciplinary corpus of scientific papers,
            for applications such as alignment of unstructured textual knowledge
            to ontologies, drug repurposing, and literature search.
          </p>
          <p>
            Due to the highly multidisciplinary nature of this project, this
            role will involve collaborating closely with domain experts to
            understand their needs, and will have considerable scope for the
            successful candidate to define projects in alignment with their
            interests and experience. A candidate with relevant experience would
            also have the opportunity to collaborate on text-mining projects
            within the group focused on materials science.
          </p>

          <p>
            This position requires:
            <ul>
              <li>
                Understanding of natural language processing techniques and
                machine learning
              </li>
              <li>Experience in software development, preferably in Python</li>
              <li>Basic understanding of web development</li>
              <li>
                Familiarity with scientific literature and the academic
                publication process
              </li>
            </ul>
            The following are not required but will be considered a plus;
            <ul>
              <li>Background in biomedical sciences</li>
              <li>
                Experience with front-end web development, especially in
                Javascript
              </li>
              <li>Experience with knowledge graphs and ontologies</li>
              <li>
                Previous work contributing to software infrastructure and data
                pipelines
              </li>
            </ul>
          </p>
          <p>
            Applicants should send a CV, cover letter, and the names of 3
            potential letter writers to{' '}
            <a href="mailto:covidscholar-hr@lbl.gov">covidscholar-hr@lbl.gov</a>
          </p>
        </Container>
        <Footer page={'about'} />
      </ContentGrid>
    </Box>
  );
}

import React from 'react';
import { Container, Header, Divider, Item } from 'semantic-ui-react';
import { Box } from 'rebass';

export default function Aknowledgements() {
  return (
    <Container>
      <Divider />
      <Header as="h1" style={{ marginTop: '10px' }}>
        COVIDScholar Data
      </Header>
      <p>
        COVIDScholar's data is collected from a number of sources, listed below.
      </p>
      <Box width={0.5}>
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header
                as="a"
                href="https://www.semanticscholar.org/cord19/download"
                target="_blank"
              >
                COVID-19 Open Research Dataset
              </Item.Header>
              <Item.Meta>Provided by Semantic Scholar</Item.Meta>
              <Item.Description>
                <p>
                  Wang, Lucy Lu et al. “CORD-19: The Covid-19 Open Research
                  Dataset.” (2020).
                </p>
              </Item.Description>
            </Item.Content>
          </Item>
          <Divider />
          <Item>
            <Item.Content>
              <Item.Header
                as="a"
                href="https://www.elsevier.com/connect/coronavirus-information-center"
                target="_blank"
              >
                Elsevier Novel Coronavirus Information Center
              </Item.Header>
              <Item.Meta>Provided by Elsevier</Item.Meta>
              <Item.Description>
                <p>
                  Elsevier’s free health and medical research on the novel
                  coronavirus (SARS-CoV-2) and COVID-19.
                </p>
              </Item.Description>
            </Item.Content>
          </Item>
          <Divider />
          <Item>
            <Item.Content>
              <Item.Header
                as="a"
                href="https://www.ncbi.nlm.nih.gov/research/coronavirus/"
                target="_blank"
              >
                LitCovid
              </Item.Header>
              <Item.Meta>
                Provided by National Center for Biotechnology Information
              </Item.Meta>
              <Item.Description>
                <p>
                  NLM/NCBI BioNLP Research Group Zhiyong Lu, PhD Qingyu Chen,
                  PhD Alexis Allot, PhD
                </p>
              </Item.Description>
            </Item.Content>
          </Item>
          <Divider />
          <Item>
            <Item.Content>
              <Item.Header
                as="a"
                href="https://forms.gle/JZxebxCNV6n9QyfU6"
                target="_blank"
              >
                COVIDScholar User Submissions
              </Item.Header>
              <Item.Meta>Provided by researchers</Item.Meta>
              <Item.Description>
                <p>
                  Documents, summaries, and metadata submitted by researchers.
                </p>
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Box>
      <Divider />
      <Header as="h1" style={{ marginTop: '10px' }}>
        Publishers
      </Header>
      <p>
        If you are a publisher of scientific research or datasets and would like
        to have your data integrated into COVIDScholar, please contact
        <span> jdagdelen</span>
        <span>@</span>
        <span>lbl.gov</span>.
      </p>
    </Container>
  );
}

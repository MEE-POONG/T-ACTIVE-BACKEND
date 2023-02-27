import Head from 'next/head';
import IndexPage from "components/layouts/IndexPage";
import ResultNumber from 'container/Dashboard/ResultNumber';
import PeakGraph from 'container/Dashboard/PeakGraph';
import RecentSalse from 'container/Dashboard/RecentSalse';
import NewListing from 'container/Dashboard/NewListing';
import { Container } from 'react-bootstrap';
export default function HomePage() {
  return (
    < >
      <Head>
        <title>T-ACTIVE</title>
        <meta
          name="description"
          content="I2AROBOT 2"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <Container>
      
    </Container>
    </ >
  );
}
HomePage.layout = IndexPage;
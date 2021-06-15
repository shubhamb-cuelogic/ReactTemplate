
import React from 'react'
import { Icon, Label, Menu, Table, Header, Rating, Grid, Image, Segment } from 'semantic-ui-react'
import PieChart from '../piChart';
import BarChart from '../barChart';
import FunnelChart from '../fuunel-chart';
import ScaatChart from '../scater-plot';
import WaterFall from '../water-fall';

export default function Syementic() {
    return (
        <>
            <Grid divided='horizontaly' >

                <Grid.Row columns={2} >
                    <Grid.Column  >
                        <Segment style={{ padding: 10, borderRadius: 8, background: 'white', height: 200 }}>
                            <BarChart />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column  >
                        <Segment style={{ padding: 10, borderRadius: 8, background: 'white', height: 200 }}>
                            <FunnelChart />
                        </Segment>
                    </Grid.Column>
                </Grid.Row>


            </Grid>
            <Grid>

                <Grid.Row columns={2} >
                    <Grid.Column  >
                        <Segment style={{ padding: 10, borderRadius: 8, background: 'white', height: 300 }}>
                            <ScaatChart />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column  >
                        <Segment style={{ padding: 10, borderRadius: 8, background: 'white', height: 300 }}>
                            <WaterFall />
                        </Segment>
                    </Grid.Column>
                </Grid.Row>

            </Grid>
            {/* <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell singleLine>Evidence Rating</Table.HeaderCell>
                        <Table.HeaderCell>Effect</Table.HeaderCell>
                        <Table.HeaderCell>Efficacy</Table.HeaderCell>
                        <Table.HeaderCell>Consensus</Table.HeaderCell>
                        <Table.HeaderCell>Comments</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            <PieChart />
                        </Table.Cell>
                        <Table.Cell singleLine>Power Output</Table.Cell>
                        <Table.Cell>
                            <Rating icon='star' defaultRating={3} maxRating={3} />
                        </Table.Cell>
                        <Table.Cell textAlign='right'>
                            80% <br />
                            <a href='#'>18 studies</a>
                        </Table.Cell>
                        <Table.Cell>
                            Creatine supplementation is the reference compound for increasing
                            muscular creatine levels; there is variability in this increase,
                            however, with some nonresponders.
        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Header as='h2' textAlign='center'>
                                A
          </Header>
                        </Table.Cell>
                        <Table.Cell singleLine>Weight</Table.Cell>
                        <Table.Cell>
                            <Rating icon='star' defaultRating={3} maxRating={3} />
                        </Table.Cell>
                        <Table.Cell textAlign='right'>
                            100% <br />
                            <a href='#'>65 studies</a>
                        </Table.Cell>
                        <Table.Cell>
                            Creatine is the reference compound for power improvement, with numbers
                            from one meta-analysis to assess potency
        </Table.Cell>
                    </Table.Row>
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='5'>
                            <Menu floated='right' pagination>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron left' />
                                </Menu.Item>
                                <Menu.Item as='a'>1</Menu.Item>
                                <Menu.Item as='a'>2</Menu.Item>
                                <Menu.Item as='a'>3</Menu.Item>
                                <Menu.Item as='a'>4</Menu.Item>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron right' />
                                </Menu.Item>
                            </Menu>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table> */}
        </>
    )
}

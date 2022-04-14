import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { colors, margins } from './Style'

const cardBorderRadius = '5px'

const Card = styled.div`
    box-shadow: 0 5px 15px 0 rgba(0,0,0,0.25);
    border-radius: ${cardBorderRadius};

    display: flex;
    flex-direction: column;
`

const CardWrapper = styled.div`
    background: transparent;
`

const TreeImage = styled.div`
    width: 100%;
    height: 200px;
    background-size: 100%;
    background-color: ${colors.lightGreen};
    background-position: center;
    background-repeat: no-repeat;
    transition: all 1s;

    &:hover {
        background-size: 105%;
    }
`

const ImageButton = styled.button`
    border: 0;
    padding: ${margins.small}px;
    cursor: pointer;
    border: 1px solid ${colors.dark};
    background: ${colors.white};
    border-radius: 2px;
    margin: ${margins.mid}px;

    &:hover {
        background: ${colors.lightGray};
    }
`

const CardHeader = styled.div`
    display: flex;
    flex-direction: column;
    padding: ${margins.mid}px;
`

const TreeCard = (props) => {
    const [showImage, setShowImage] = useState(false)

    return (
        <CardWrapper>
            <Card>
                <CardHeader>
                    <h2 data-testid='tree-name'>{props.name}</h2>

                    <h3 data-testid='tree-species'>{props.species_name}</h3>
                </CardHeader>

                {showImage && <TreeImage data-testid='tree-image' style={{ backgroundImage: `url('${props.image}')` }} />}

                <ImageButton data-testid='tree-button' onClick={() => setShowImage(!showImage)}>
                    {showImage ? 'Hide image' : 'Show image'}
                </ImageButton>
            </Card>
        </CardWrapper>
    )
}

export default TreeCard

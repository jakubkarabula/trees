import React from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { margins } from './Style'
import TreeCard from './TreeCard'

const Content = styled.main`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 1000px;
`

const TreeGrid = styled.div`
  display: grid;
  gap: ${margins.big}px;
  margin: ${margins.big}px;
  grid-template-columns: repeat(auto-fit,minmax(250px, 1fr));
`

const Header = styled.header`
  padding: ${margins.big}px;
`

function App() {
  const [trees, setTrees] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    const treesURL = 'https://s3.eu-central-1.amazonaws.com/ecosia-frontend-developer/trees.json'
    
    fetch(treesURL)
      .then((response) => response.json())
      .then((data) => {
        setTrees(data.trees)
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
        setError(error)
      })
  }, [])

  return (
    <Content>
      <Header>
        <h1 data-testid='header-greeter'>Trees Showcase 🌿</h1>

        {error && <h2 data-testid='header-error'>
          An error occured during downloading of the trees. Please refresh. 🍀
        </h2>}

        {loading && <h2 data-testid='header-loader'>Loading...🍀</h2>}
      </Header>
      
      <TreeGrid>
        {trees?.map(tree => <TreeCard key={tree.name} {...tree} />)}
      </TreeGrid>
    </Content>
  )
}

export default App

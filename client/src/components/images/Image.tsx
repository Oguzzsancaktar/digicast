import React from 'react'
import styled from 'styled-components'

const ImageSC = styled.img`
  background-size: contain;
`

interface IProps {
  src: string
}
const Image: React.FC<IProps> = ({ src }) => {
  return <ImageSC width="100%" height="100%" src={src} />
}

export default Image

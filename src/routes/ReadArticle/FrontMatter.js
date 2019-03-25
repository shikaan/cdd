import React, {Component, Fragment} from "react";
import styled from "styled-components";
import {get} from "lodash";

import Heading from "~components/Heading";
import Image from "~components/Image";
import Overline from "~components/Overline";
import Tag from "~components/Tag";

const Header = styled.header(({theme}) => `
  padding: ${theme.templateVariables.verticalPadding} ${theme.templateVariables.horizontalPadding}
`);

const FrontMatterHeading = styled(Heading)(({theme}) => `
  padding-bottom: ${theme.templateVariables.verticalPadding};
`);

class FrontMatter extends Component {
  render() {
    const {content, post, tags} = this.props;

    const minutes = get(post, "fields.readingTime.minutes", 0);
    const readingTime = Math.ceil(minutes);

    return (
      <Fragment>
        <Image fluid={post.frontmatter.coverImage.childImageSharp.fluid} alt={post.frontmatter.title}/>
        <Header>
          <Overline>
            {post.frontmatter.date} – {readingTime} {content.shared.readingTime}
          </Overline>

          <FrontMatterHeading level={1} sub={post.frontmatter.description}>
            {post.frontmatter.title}
          </FrontMatterHeading>

          {tags.map(i => <Tag key={i} to={`/search?query=${i}`}>{i}</Tag>)}
        </Header>
      </Fragment>
    );
  }
}

export default FrontMatter;

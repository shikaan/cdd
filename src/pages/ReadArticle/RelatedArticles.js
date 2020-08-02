import React, {Component} from "react";
import styled from "styled-components";

import Card, {CONTEXT} from "~components/Card";
import Divider from "~components/Divider";
import Heading from "~components/Heading";
import {CardListItem, UnorderedCardList} from "~components/CardList";
import {isLastIndex, isTablet} from "~utils";
import {getMicrocopy, validateSlug} from "~/utils";

const Section = styled.section(({theme}) => `
  max-width: ${theme.breakpoint.sm};
  margin: auto;
`);

const RelatedArticlesHeading = styled(Heading)(({theme}) => `
  padding: ${theme.typography.baseFontSize.multiply(1.5)} ${theme.typography.baseFontSize.multiply(.5)};
  color: ${theme.color.dark500}
`);

class RelatedArticles extends Component {
  render() {
    const {content, list, fallbackList} = this.props;

    const articles = list.length ? list : fallbackList;

    return (
      <Section>
        <RelatedArticlesHeading level={2}>
          {content.title}
        </RelatedArticlesHeading>
        <UnorderedCardList>
          {
            articles.map(({node: article}, index) => {
              const {slug, coverImage, description, title, tags, body, publishDate} = article;
              const overline = `${publishDate} – ${body.childMarkdownRemark?.timeToRead} ${getMicrocopy(content.microcopy, "shared.reading-time")}`;

              return (
                <CardListItem key={index}>
                  <Card
                    description={description}
                    image={coverImage}
                    overline={overline}
                    slug={validateSlug(slug)}
                    tags={tags.slice(0,2)}
                    title={title}
                    context={isTablet() ? CONTEXT.LIST : CONTEXT.POLAROID}
                  />
                  {!isLastIndex(list, index) && <Divider/>}
                </CardListItem>
              );
            })
          }
        </UnorderedCardList>
      </Section>
    );
  }
}

export default RelatedArticles;

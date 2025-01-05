import { A } from "@solidjs/router";
import { Col, Row } from "solid-bootstrap";
import { getRandomHeadshot } from "../../utils/utils";
import { Show } from "solid-js";

const WorkItem = ({ imgUrl, containerHeight, workName, workDate, type, url, isAdmin }) => {
  return (
    <A href={url} class={`work-item type-${type}`}>
      <div class={`work-item-img work-${containerHeight}`}>
        <div class="work-item-img-wrapper">
          <img src={imgUrl} alt="" />
        </div>

        <Row class="work-item-info">
          <Col class="col-12 col-md-8">
          <p class="mb-1" id="work-name">{workName}</p>
          <div class="d-flex align-items-center">
          <img class="work-author-img me-2" src={getRandomHeadshot()} alt="" />
          <div class="d-flex flex-column">
          <small id="work-author">{'Erik Lew'}</small>
          <small id="work-date">{workDate}</small>
          </div>
          </div>
          </Col>
          <Col class="col-12 col-md-4 d-flex justify-content-end align-items-end">
          <p id="work-date">{workDate}</p>
          </Col>
        </Row>
      </div>
      <div class="work-item-cta">
        <Show when={isAdmin}>
          <button class="me-1" onClick={(e) => {
            e.stopPropagation()
          }}>Edit Post</button>
        </Show>
        <A href={url}>
          {type === "blog" ? (
            <button>View Post</button>
          ) : type === "article" ? (
            <button>View Article</button>
          ) : null}
        </A>
      </div>
    </A>
  );
};

export default WorkItem;
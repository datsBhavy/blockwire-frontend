import { Component, createEffect, createResource, createSignal, JSX, onMount } from "solid-js";
import { IInfluencer } from "../types";
import { createInfluencer, editInfluencer, fetchAllTags } from "../utils/fetcher";
import CustomInput from "./CustomInput"
import { Style } from "@solidjs/meta";
import { Light } from "../constants/styles";
import { Col, Row } from "solid-bootstrap";
import TagInput from "./TagInput";
import QuillEditor from "./inquiryForm/QuillEditor";

interface InfluencerFormProps {
    onSubmit?: () => void
    influencer?: IInfluencer
}

const InfluencerForm: Component<InfluencerFormProps> = (props) => {
    const [loading, setLoading] = createSignal<boolean>(false)

    const [tags] = createResource(fetchAllTags)
    const [content, setContent] = createSignal<string>("")

    createEffect(() =>{
        console.log(tags())
    })
    const handleInfluencerSubmit = (event: HTMLFormElement) => {
        setLoading(true)
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
    
        const influencerData: IInfluencer = {
          name: formData.get("Name") as string,
          description: content() ?? formData.get("Description") as string,
          profileImage: formData.get("Profile Image URL") as string,
          instagramHandle: formData.get("Instagram Handle") as string | undefined,
          xHandle: formData.get("X Handle") as string | undefined,
        };
    
        // Call your API to save the influencer

        if (props.influencer) {
            editInfluencer(props.influencer._id, influencerData).then(() => {
                props.onSubmit?.()
                setLoading(false)
              })
              .catch((error) => {
                console.error("Error adding influencer:", error)
                setLoading(false)
              });
        } else {
            createInfluencer(influencerData)
              .then(() => {
                props.onSubmit?.()
                setLoading(false)
              })
              .catch((error) => {
                console.error("Error adding influencer:", error)
                setLoading(false)
              });
        }

       
      };

      onMount(() => {
        if (props.influencer) {
            console.log(props.influencer)
            const influencer = props.influencer;
            const form = document.querySelector(".influencer-form") as HTMLFormElement;
            if (form) {
                form.querySelector('input[name="Name"]').value = influencer.name;
                form.querySelector('input[name="Profile Image URL"]').value = influencer.profileImage ?? '';
                // form.querySelector('input[name="Description"]').value = influencer.description ?? '';
                form.querySelector('input[name="Instagram Handle"]').value = influencer.instagramHandle ?? "";
                form.querySelector('input[name="X Handle"]').value = influencer.xHandle ??"";  
            }
        }
      }) 
    
    return (
        <>
        <Style>{`
       
        `}</Style>
           <form class="influencer-form" onSubmit={handleInfluencerSubmit}>
    <h1 class="mb-5 fw-bold text-light">Add Influencer</h1>
    <Row>
        <Col class="col-12 col-md-6"> <CustomInput label="Name" name="Name" /></Col>
        <Col class="col-12 col-md-6"><CustomInput label="Profile Image URL" type="url" name="Profile Image URL" /></Col>
    </Row>
   
    <div class="mb-3 text-light">
          <QuillEditor value={props.influencer?.description ?? ""} onChange={setContent} />
          </div>
    <TagInput selectedTags={props.influencer?.tags ?? [{
        name: 'Example Tag', id: '1'
    }]}  />
    
    <Row>
        <Col class="col-12 col-md-6">
        
    <CustomInput label="Instagram Handle" name="Instagram Handle" />
        </Col>
        <Col class="col-12 col-md-6">
    <CustomInput label="X Handle" name="X Handle" />
        
        </Col>
    </Row>
    <button disabled={loading()} class="submit-button primary-button justify-content-center w-100 py-3">
        Submit
    </button>
</form></>

    )
}

export default InfluencerForm
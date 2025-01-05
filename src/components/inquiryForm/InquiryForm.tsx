import { Component, createSignal, Show, Suspense } from "solid-js";
import { useTheme } from "../../context/ThemeContext";
import { Container, Row, Col, Form } from "solid-bootstrap";
import { css } from "solid-styled-components";
import QuillEditor from "./QuillEditor";
import { Style } from "@solidjs/meta";
const API_KEY = import.meta.env.HUBSPOT_API_KEY;

interface InquiryFormProps {
  variant?: 'contact'
}
const InquiryForm: Component<InquiryFormProps> = (props) => {
  const { theme } = useTheme();

  const [formData, setFormData] = createSignal({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    companyName: "",
    description: "",
    budget: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = {
      properties: {
        firstname: formData().firstName,
        lastname: formData().lastName,
        email: formData().email,
        phone: formData().phoneNumber,
        company: formData().companyName,
        message: formData().description,
      },
    };
  
    try {
        const response = await fetch('/api/contact')
        console.log(response)
      alert("Inquiry submitted successfully!");
    } catch (error) {
      console.error("Error submitting inquiry:", error);
    }
  };

  const colWidth = () => 12

  return (
    <>
    <Style>{`
      .inquiry-form-container {}

      .form-title {
        font-size: 6rem!important; 
        font-weight: bolder!important;
        padding-right: 2rem;
        line-height: 4.6rem;
        text-transform: unset;
        color: inherit; 
      }

      & .form-control:active, & .form-control:focus {
        border: unset;
        box-shadow: unset;
        background-color: unset;
        }

      & .form-control {
        background-color: unset;
        border: unset;
      }
    `}</Style>
    <Container
      class="inquiry-form-container"
      style={{
        transition: "background-color 0.5s ease, color 0.5s ease",
      }}
    >
      <Show
        when={props.variant !== "contact"}
        fallback={<h2 class="form-title">Contact Us</h2>}
      >
        <h1 class="form-title mb-0">Need help?</h1>
        <h1 class="form-title"> Get in touch</h1>
      </Show>
      <form onSubmit={handleSubmit}>
        <Row>
          {/* First Name */}
          <Col md={12}>
            <Form.Floating>
              <Form.Control
                size="lg"
                id="firstName"
                type="text"
                placeholder="First Name*"
                required
                value={formData().firstName}
                onInput={(e) =>
                  setFormData({ ...formData(), firstName: e.target.value })
                }
              />
              <Form.Label htmlFor="firstName">First Name*</Form.Label>
            </Form.Floating>
          </Col>

          {/* Last Name */}
          <Col md={12}>
            <Form.Floating>
              <Form.Control
              size="lg"
                id="lastName"
                type="text"
                placeholder="Last Name*"
                required
                value={formData().lastName}
                onInput={(e) =>
                  setFormData({ ...formData(), lastName: e.target.value })
                }
              />
              <Form.Label htmlFor="lastName">Last Name*</Form.Label>
            </Form.Floating>
          </Col>
        </Row>

        <Row>
          {/* Phone Number */}
          <Col md={colWidth()}>
            <Form.Floating>
              <Form.Control
              size="lg"
                id="phoneNumber"
                type="tel"
                placeholder="Phone Number*"
                required
                value={formData().phoneNumber}
                onInput={(e) =>
                  setFormData({ ...formData(), phoneNumber: e.target.value })
                }
              />
              <Form.Label htmlFor="phoneNumber">Phone Number*</Form.Label>
            </Form.Floating>
          </Col>

          {/* Email */}
          <Col md={colWidth()}>
            <Form.Floating>
              <Form.Control
              size="lg"
                id="email"
                type="email"
                placeholder="Email*"
                required
                value={formData().email}
                onInput={(e) =>
                  setFormData({ ...formData(), email: e.target.value })
                }
              />
              <Form.Label htmlFor="email">Email*</Form.Label>
            </Form.Floating>
          </Col>
        </Row>

        <Row>
          <Show when={props.variant !== "contact"}>
            {/* Company Name */}
            <Col md={colWidth()}>
              <Form.Floating>
                <Form.Control
                size="lg"
                  id="companyName"
                  type="text"
                  placeholder="Company Name"
                  value={formData().companyName}
                  onInput={(e) =>
                    setFormData({ ...formData(), companyName: e.target.value })
                  }
                />
                <Form.Label htmlFor="companyName">Company Name (Optional)</Form.Label>
              </Form.Floating>
            </Col>

            {/* Budget */}
            <Col md={colWidth()}>
              <Form.Floating>
                <Form.Control
                size="lg"
                  id="budget"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Budget"
                  value={formData().budget}
                  onInput={(e) =>
                    setFormData({ ...formData(), budget: e.target.value })
                  }
                />
                <Form.Label htmlFor="budget">Budget (Optional)</Form.Label>
              </Form.Floating>
            </Col>
          </Show>
        </Row>

        <Row>
          {/* Work Description */}
          <Col>
            <label htmlFor="description">
              {props.variant === "contact"
                ? "Reason for contacting"
                : "Brief Description of the Work*"}
            </label>
            <QuillEditor
              id="description"
              value={formData().description}
              onChange={(value) =>
                setFormData({ ...formData(), description: value })
              }
            />
          </Col>
          <Col class="col-12 mt-4">
            <button type="submit" class="submit-button w-100">
              {props.variant === "contact" ? "Contact Us" : "Submit Inquiry"}
            </button>
          </Col>
        </Row>
      </form>
    </Container>
  </>
    
  );
};

export default InquiryForm;
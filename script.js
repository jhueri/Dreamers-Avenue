// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", () => {
  // Header scroll effect
  const header = document.querySelector("header")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Mobile navigation toggle
  const navToggle = document.getElementById("nav-toggle")
  if (navToggle) {
    navToggle.addEventListener("change", function () {
      document.body.classList.toggle("nav-open", this.checked)
    })
  }

  // Animate elements on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".stat-box, .testimonial, .team-member, .difference-item, .resource-card, .option-card",
    )

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.3

      if (elementPosition < screenPosition) {
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }
    })
  }

  // Set initial state for animated elements
  const elementsToAnimate = document.querySelectorAll(
    ".stat-box, .testimonial, .team-member, .difference-item, .resource-card, .option-card",
  )
  elementsToAnimate.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  })

  // Run animation on load and scroll
  window.addEventListener("load", animateOnScroll)
  window.addEventListener("scroll", animateOnScroll)

  // FAQ toggles
  const faqQuestions = document.querySelectorAll(".faq-question")
  if (faqQuestions.length > 0) {
    faqQuestions.forEach((question) => {
      question.addEventListener("click", () => {
        const faqItem = question.parentElement
        const isActive = faqItem.classList.contains("active")

        // Close all other FAQs
        document.querySelectorAll(".faq-item").forEach((item) => {
          item.classList.remove("active")
          const icon = item.querySelector(".faq-toggle i")
          if (icon) {
            icon.className = "fas fa-plus"
          }
        })

        // Toggle current FAQ
        if (!isActive) {
          faqItem.classList.add("active")
          const icon = question.querySelector(".faq-toggle i")
          if (icon) {
            icon.className = "fas fa-minus"
          }
        }
      })
    })
  }

  // Resource category tabs
  const categoryTabs = document.querySelectorAll(".category-tab")
  if (categoryTabs.length > 0) {
    categoryTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Remove active class from all tabs
        categoryTabs.forEach((t) => t.classList.remove("active"))

        // Add active class to clicked tab
        tab.classList.add("active")

        // Hide all resource sections
        document.querySelectorAll(".resource-section").forEach((section) => {
          section.classList.remove("active")
        })

        // Show the selected resource section
        const targetId = tab.getAttribute("data-target")
        document.getElementById(targetId).classList.add("active")
      })
    })
  }

  // Form submissions
  const forms = document.querySelectorAll("form")
  forms.forEach((form) => {
  const action = form.getAttribute("action");
  if (action && action.includes("formsubmit.co")) return; // let Formsubmit forms submit normally

  form.addEventListener("submit", (e) => {
    e.preventDefault();

      // Simple form validation
      let isValid = true
      const requiredFields = form.querySelectorAll("[required]")

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false
          field.classList.add("error")
        } else {
          field.classList.remove("error")
        }
      })

      if (isValid) {
        // In a real application, you would send the form data to a server
        // For this demo, we'll just show a success message
        const formId = form.id
        let successMessage = "Thank you! Your submission has been received."

        if (formId === "newsletter-form") {
          successMessage = "Thank you for subscribing to our newsletter!"
        } else if (formId === "volunteer-signup") {
          successMessage = "Thank you for your interest in volunteering! We will contact you soon."
        } else if (formId === "partnership-inquiry") {
          successMessage =
            "Thank you for your partnership inquiry! We will review your information and get back to you."
        } else if (formId === "contact-form") {
          successMessage = "Thank you for your message! We will respond within 48 hours."
        } else if (formId === "resource-request-form") {
          successMessage = "Thank you for your resource request! We will consider adding it to our collection."
        }

        // Create success message element
        const successElement = document.createElement("div")
        successElement.className = "form-success"
        successElement.textContent = successMessage

        // Replace form with success message
        form.innerHTML = ""
        form.appendChild(successElement)

        // Scroll to success message
        successElement.scrollIntoView({ behavior: "smooth" })
      }
    })
  })

  // Add error class on blur if required field is empty
  const requiredFields = document.querySelectorAll("[required]")
  requiredFields.forEach((field) => {
    field.addEventListener("blur", function () {
      if (!this.value.trim()) {
        this.classList.add("error")
      } else {
        this.classList.remove("error")
      }
    })

    // Remove error class when user starts typing
    field.addEventListener("input", function () {
      this.classList.remove("error")
    })
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href")

      // Only process if the href is not just "#"
      if (targetId !== "#") {
        e.preventDefault()

        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          })

          // Close mobile navigation if open
          if (navToggle && navToggle.checked) {
            navToggle.checked = false
            document.body.classList.remove("nav-open")
          }
        }
      }
    })
  })
})

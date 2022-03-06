import React, { Fragment } from 'react';
import Navbar from './Navbar';

const Faq = () => {
	return (
		<Fragment>
			<Navbar />
			<div className='container py-4'>
				<h2 className='text-center'>
					<strong>ChildAcademy FAQs</strong>
				</h2>
				<div className='py-3'>
					{faqs.map((faq, index) => (
						<div className='mb-4' key={index}>
							<h5>{faq.question}</h5>
							<small>{faq.answer}</small>
						</div>
					))}
				</div>
			</div>
		</Fragment>
	);
};

export default Faq;

const faqs = [
	{
		question: 'How do I sign-up for tuition?',
		answer:
			'Please call 0800 011 9729 to inquire about tutors near you or use our online form.',
	},
	{
		question: 'How do I know tutoring will help me?',
		answer:
			'Before a tutor is assigned to your student, our Education Consultant will meet with both parents and child to assess the need for a tutor, and where your child is struggling.',
	},
	{
		question: 'Do you offer 11+ / Common Entrance assistance?',
		answer:
			'No, we only provide support for children from the age of 5 years to 10 years in English and Maths.',
	},
	{
		question: 'Do you offer online tutoring?',
		answer:
			'We only offer one- to- one online tutoring via Zoom or any means of online communication to best accommodate your individual needs. Parent or adult will be needed to help the children login for the session.',
	},
	{
		question: 'What subjects do you offer tutoring in?',
		answer:
			'The tutors we work with offer assistance in Maths and English. Our most in-demand is helping children with reading and writing.',
	},
	{
		question: 'Who are the tutors?',
		answer:
			'The team of tutors we work with come from a variety of backgrounds, including former and current teachers, professionals from a wide variety of disciplines, and others who may have specific expertise in the subject area. The two things they all have in common are that they are experts in their respective academic subjects and they are passionate about helping student’s succeed.',
	},
	{
		question: 'Are tutors available in other languages besides English?',
		answer: 'Our tutors only speak and teach in English.',
	},
	{
		question: 'Are you flexible with tutoring days and times?',
		answer:
			'Yes, the tutors we work with give us their availability before we match with the student. During the consultation, the education consultant will discuss scheduling constraints and work with the family to determine the best schedule for the sessions.',
	},
	{
		question: 'How much does your service cost?',
		answer:
			'At the local level, price is based on age of student, subject matter and any special requirements which may be requested by the family. Due to the flexibility families enjoy in how and when they may use tutoring hours, we provide discounts on packages of hours to accommodate the needs of the family.',
	},
	{
		question: 'As a student, what can I expect from my tutoring sessions?',
		answer:
			'The tutor will come to your home to work with you closely on understanding the subject where you need assistance. This time can be used to ensure you build a foundation of the subject, as well as review homework, build study habits, focus on time management and organisational skills, or get ahead in the subject. The tutors on your team will work with you to develop a programme that works best to fit your needs and learning style.',
	},
	{
		question: 'How do I contact my tutor?',
		answer:
			'Once a tutor who is a good fit has been selected, you will be provided their contact information and they will aso contact you.',
	},
	{
		question: 'What if I need to cancel a session?',
		answer:
			'Please call the tutor directly with as much notice as possible and also notify the office. The tutors do require 24 hours notification in order to cancel sessions. You can work together to reschedule the missed appointment for a time that works for both of you.',
	},
	{
		question: 'What if I need reschedule my tutoring session?',
		answer: 'Please call the tutor directly to reschedule a session.',
	},
	{
		question: 'What if I am having problems with my tutor?',
		answer:
			'You can contact your local office who would be happy to find an alternative tutor for your needs.',
	},
	{
		question: 'How does someone join the Tutor Doctor team?',
		answer: `Anyone interested in becoming a tutor can call their local office or submit an application at: ${(
			<a href='/become-a-tutor/'>
				https://www.tutordoctor.co.uk/become-a-tutor/
			</a>
		)}`,
	},
	{
		question: 'How often is tutoring required?',
		answer:
			'The frequency of tutoring sessions is determined by the age of the student, the subject, what their current grades are, and their learning style. Our Education Consultant will discuss these details at the consultation.',
	},
	{
		question: 'What are the most important qualities in a tutor?',
		answer:
			'At ChildAcademy, we believe the match of a tutor to student plays a key role in success. In our experience, the single most important quality in a tutor is their ability to communicate with the student in a manner that increases confidence and self-esteem. We work closely with the family to ensure we match not only for the subject, but also age, personality and learning style. Tutors are skilled at listening, building self-confidence, engaging students, and motivating them.',
	},
	{
		question:
			'What training and experience do the tutors with Tutor Doctor have?',
		answer:
			'The tutors we connect you with are personally selected for their expertise in their subject matter. They include university lecturers, teachers, professionals with a degree in their tutored area, and university graduate students with high academic standing.',
	},
	{
		question: 'Will I get the same tutor every time?',
		answer:
			'Yes. From our initial consultation, we choose the most suitable tutor for you based on your schedule. That tutor will be assigned to you for the duration of the enrollment.',
	},
	{
		question: 'How are sessions tailored to the needs of each student?',
		answer:
			'The combination of a highly qualified tutor, working with the student’s school curriculum, and in coordination with the parents and teachers allows us to tailor the sessions to the student’s needs.',
	},
	{
		question: 'What if a tutoring option is not listed on your website?',
		answer:
			'Please call us. In most locations, our offices maintain a robust roster of tutors, many of whom are skilled in subjects which may not be listed on our website.',
	},
	{
		question: 'Do you provide an assessment?',
		answer:
			'During the consultation, the education consultant may provide formal and informal assessments depending on the academic situation.',
	},
	{
		question: 'If I have questions or concerns, whom do I contact?',
		answer:
			'If you have a question or concern that cannot be answered by the tutor selected for you, you can call the Educational Consultant or the location owner directly. We are 100% focused on the success of your student, so we encourage clients to contact us with any questions',
	},
];

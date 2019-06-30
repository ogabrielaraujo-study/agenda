import { Calendar } from '@fullcalendar/core';
import { RRule, RRuleSet, rrulestr } from 'rrule';
import rrulePlugin from '@fullcalendar/rrule';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import momentPlugin from '@fullcalendar/moment';
import brLocale from '@fullcalendar/core/locales/pt-br';
import axios from 'axios';
import io from 'socket.io-client';

var $ = require('jquery');
window.jQuery = $;
window.$ = $;

$(document).ready(function() {

	$('form').submit(function(e) {
		e.preventDefault();
	});

	var calendarEl = document.getElementById('calendar');

	var calendar = new Calendar(calendarEl, {
		locale: brLocale,

		timeZone: 'local',

		height: 880,

		nowIndicator: true,

		plugins: [ interactionPlugin, dayGridPlugin, timeGridPlugin, bootstrapPlugin, momentPlugin, rrulePlugin ],

		themeSystem: 'bootstrap',

		defaultView: 'timeGridWeek',

		header: {
			left: 'today prev,next',
			center: 'title',
			right: 'dayGridMonth,timeGridWeek,timeGridDay,timeGridFourDay',
		},

		navLinks: true, // can click day/week names to navigate views

		editable: true,

		eventLimit: true, // allow "more" link when too many events

		allDaySlot: false,

		slotEventOverlap: true,

		slotDuration: '00:30',

		snapDuration: '00:30:00',

		minTime: '05:00',

		maxTime: '22:00',

		displayEventEnd: true,

		displayEventTime: true,

		eventOverlap: true, // permitir mais de um evento no mesmo horário

		eventTimeFormat: {
			hour: '2-digit',
			minute: '2-digit',
			omitZeroMinute: false,
		},

		columnHeaderFormat: {
			day: 'numeric',
			weekday: 'short',
		},

		//titleFormat: 'MMMM YYYY', // D/MMMM/YYYY
		//scrollTime: '12:00',
		//defaultDate: '2019-06-12',
		//hiddenDays: [ 1, 4 ], // remover segunda feira
		/*columnHeaderHtml: function(date) {
			if (date.getUTCDay() === 5) {
			  return '<b>Friday!</b>';
			} else {
			  return '<i>other day</i>';
			}
		},*/

		slotLabelFormat: {
			hour: 'numeric',
			minute: '2-digit',

		},

		views: {
			timeGridFourDay: {
				type: 'timeGrid',
				duration: { days: 4 },
				buttonText: '4 dias',
			},
		},


		//events: myEvents,
		events: 'http://localhost:3333/events',


		dateClick: function(info) {

		},


		selectable: true,
		select: async function(event) {
			var name = prompt('Enter name');

			if (!name) {
				return;
			}

			createEvent(name, event);
		},

		selectHelper: true,


		eventRender: function(info) {

		},


		eventClick: function(info) {

		},


		eventDragStart: function(info) {

		},


		eventDragStop: function(info) {

		},


		eventDrop: function(info) {
			updateEvent(info);
		},


		eventResize: function(info) {
			updateEvent(info);
		},


		eventMouseEnter: function(mouseEnterInfo) {

		},


		eventMouseLeave: function(mouseLeaveInfo) {

		},


	});

	calendar.render();

	// console.log(calendar.getEvents());
	// console.log(calendar.getEventById( 4 ));

	function createEvent(name, event) {
		var data = JSON.stringify({
			title: name,
			start: event.startStr,
			end: event.endStr
		});

		var headers = {headers: {'Content-Type': 'application/json'}};

		axios.post('http://localhost:3333/events', data, headers)
			.then(function(response) {
				return true;
			})
			.catch(function(response) {
				alert('Error');
			});
	}

	function updateEvent(info) {
		var id = info.event.extendedProps._id;
		var headers = {headers: {'Content-Type': 'application/json'}};

		var data = JSON.stringify({
			start: info.event.start,
			end: info.event.end
		});

		axios.put('http://localhost:3333/events/' + id, data, headers)
		.then(function(response) {
			return true;
		})
		.catch(function(response) {
			alert('Error');
		});
	}

	const socket = io('http://localhost:3333');

	socket.on('createEvent', createdEvent => {
		calendar.refetchEvents();
	});

	socket.on('updateEvent', updatedEvent => {
		calendar.refetchEvents();
	});

	socket.on('deleteEvent', deletedEvent => {
		calendar.refetchEvents();
	});

});



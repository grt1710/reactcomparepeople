import React, { Component } from 'react';
import {connect} from 'react-redux';
import lodash from 'lodash';

class CompareInfo extends Component {
  render () {
    var {person1Data, person2Data} = this.props;
    function renderData(data1, data2) {
        try {
          var data1 = data1.person;
          var data2 = data2.person;

          if (data1.infobox_template === 'cricketer' && data2.infobox_template === 'cricketer') {
          let image1 = data1.images[0].url;
          let image2 = data2.images[0].url;
          var name1 = data1.infobox.name.text;
          var name2 = data2.infobox.name.text;
          var handedness1 = data1.infobox.batting.text;
          var handedness2 = data2.infobox.batting.text;
          var testBattingAvg1 = data1.infobox['bat avg1'].text;
          var testBattingAvg2 = data2.infobox['bat avg1'].text;
          var odiBattingAvg1 = data1.infobox['bat avg2'].text;
          var odiBattingAvg2 = data2.infobox['bat avg2'].text;
          var topTestScore1 = data1.infobox['top score1'].text;
          var topTestScore2 = data2.infobox['top score1'].text;
          var topOdiScore1 = data1.infobox['top score2'].text;
          var topOdiScore2 = data2.infobox['top score2'].text;

            return (
              <table>
                <tbody>
                  <tr>
                    <td>{name1}</td>
                    <td>{name2}</td>
                  </tr>
                  <tr>
                    <td><img src={image1} height="120"/></td>
                    <td><img src={image2} height="120"/></td>
                  </tr>
                  <tr>
                    <td>{handedness1}</td>
                    <td>{handedness2}</td>
                  </tr>
                  <tr>
                    <td>Test Batting Avg: {testBattingAvg1}</td>
                    <td>Test Batting Avg: {testBattingAvg2}</td>
                  </tr>
                  <tr>
                    <td>ODI Batting Avg: {odiBattingAvg1}</td>
                    <td>ODI Batting Avg: {odiBattingAvg2}</td>
                  </tr>
                  <tr>
                    <td>Top Test Score: {topTestScore1}</td>
                    <td>Top Test Score: {topTestScore2}</td>
                  </tr>
                  <tr>
                    <td>Top ODI Score: {topOdiScore1}</td>
                    <td>Top ODI Score: {topOdiScore2}</td>
                  </tr>
                </tbody>
              </table>
            );

          } else if (data1.infobox_template === 'person' && data2.infobox_template === 'person') {

            var birthPlace1 = data1.infobox.birth_place.text;
            var birthPlace2 = data2.infobox.birth_place.text;
            let imageLinks1 = data1.images.pop().map(function(element) {
              if (element.url) {
                return element.url
              } else {
                return ''
              }
            });
            let validImages1 = imageLinks1.map(function(url){
              if (url.slice(-4,-1) === '.jpg'){
                return url
              } else {
                return ''
              }
            });
            console.log(imageLinks1, validImages1);

            let imageLinks2 = data2.images.pop().map(function(element) {
              if (element.url) {
                return element.url
              } else {
                return ''
              }
            });
            let validImages2 = imageLinks2.map(function(url){
              if (url.slice(-4,-1) === '.jpg'){
                return url
              } else {
                return ''
              }
            });
            console.log(imageLinks2, validImages2);

              return (
                <table>
                  <tbody>
                    <tr>
                      <td><img src={v} height="120"/></td>
                      <td><img src={image2} height="120"/></td>
                    </tr>
                    <tr>
                      <td>Born at: {birthPlace1}</td>
                      <td>Born at: {birthPlace2}</td>
                    </tr>
                  </tbody>
                </table>
              );

          } else {
            return <div>Please select cricketers</div>
          }

        } catch (e) {
            return undefined;
        }
    }
    console.log(person1Data);
    console.log(person2Data);
    return (
      <div>
        {renderData(person1Data, person2Data)}
      </div>
    );
  }
}

function mapStateToProps({ person1Data, person2Data }){
  return {
    person1Data,
    person2Data
  }
};

export default connect(mapStateToProps, null)(CompareInfo);
